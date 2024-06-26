import { useEffect, useState } from "react"
import { Layout } from "../components/Layout"
import { client } from "../lib/createClient";
import { Link } from "react-router-dom";

import { Helmet } from 'react-helmet-async';

export const Home = () => {
    const [categories, setCategories] = useState([]); // retorna um array
    const [posts, setPosts] = useState([]);

    // ciclo de vida de componentes
    // posso escrever JavaScript
    useEffect(() => {
        // Pedir para o objeto client buscar os últimos 5 posts
        client
            .getEntries({
                content_type: 'blogPostAula',
                limit: 5,
                order: "-sys.createdAt"
            })
            .then(function (entries) {
                console.log('posts', entries.items);
                setPosts(entries.items);
            });

        // Pedir para o objeto client buscar todas as categorias
        client
            .getEntries({
                content_type: 'blogCategoryAula',
            })
            .then(function (entries) {
                console.log('categorias', entries.items);
                setCategories(entries.items);
            });
    }, []); // array vazio indica o onload do componente

    return (
        <>
            <Helmet>
                <title>Welcome to my page!</title>
            </Helmet>
            <Layout>
                <div className="container">
                    <div className="row">
                        <main className="col-md-8">
                            <h1 className="my-3">Últimos posts</h1>

                            {posts.map(post => (
                                <div className="card mb-3" key={post.sys.id}>
                                    <div className="card-body">
                                        <h5 className="card-title">{post.fields.postTitle}</h5>
                                        <p className="card-text">{post.fields.postDescription}</p>
                                        <Link to={`/post/${post.fields.postSlug}`} className="card-link">
                                            Ver post
                                        </Link>
                                    </div>
                                </div>
                            ))}
                            
                            <a href="#" className='btn btn-primary'>Ver todos os posts</a>
                        </main>
                    
                        <aside className="col-md-4">
                            <h2>Categorias</h2>
                            <ul>
                                {categories.map(category => (
                                    <li key={category.sys.id}>
                                        {category.fields.categoryTitle}
                                    </li>
                                ))}
                            </ul>
                        </aside>
                    </div>
                </div>
            </Layout>
        </>
    )
}