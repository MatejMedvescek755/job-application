import { useEffect, useState } from 'react';
import './About.css';
import api from "../api-requests.ts"
import { useParams } from 'react-router-dom';

const About = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const param = useParams()
    const [item, setItem] = useState({ title: "title", image: ":(", id:"empty" })
    const [comments, setComments] = useState([]);
    useEffect(() => {
        async function getId() {
            const response = await api.fetchProductById(param.id + "")
            const getComments = await api.fetchComments(param.id + "")


            setItem(response);
            setComments(getComments)
        }

        getId()
    }, [])


    const handleFavoriteToggle = () => {
        setIsFavorite(!isFavorite);
        if (isFavorite) {
            api.addFavorite(item.id)
        } else {
            api.removeFavorite(item.id)
        }
    };



    return (
        <div className="container">
            <header>
                <a href="/" className="home-link">Home</a>
            </header>

            <main className="main-content">
                <h1>{item.title}</h1>

                <img className="image-box" src={item.image} />

                <button
                    className={`favorite-button ${isFavorite ? 'favorite' : ''}`}
                    onClick={handleFavoriteToggle}
                >
                    {isFavorite ? 'Remove Favorite' : 'Add to Favorite'}
                </button>

                <section className="comments-section">
                    <h2>Comments</h2>
                    <ul className="comments-list">
                        {
                            comments ?
                                <div>
                                    {comments.map((el) => {
                                        return <p key={el}>{el}</p>
                                    })}
                                </div>
                                :
                                <li>No comments yet</li>
                        }

                    </ul>
                </section>
            </main>
        </div>
    );
};

export default About;