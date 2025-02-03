import { useState } from 'react';
import "./Item.css"
import api from "../api-requests.ts"
import { Link } from 'react-router-dom';

function Item({ item }) {
    const [isFavorite, setIsFavorite] = useState(false);

    const handleFavoriteToggle = (e) => {
        e.stopPropagation()
        e.preventDefault()
        setIsFavorite(!isFavorite);
        if (isFavorite) {
            api.addFavorite(item.id)
        } else {
            api.removeFavorite(item.id)
        }
    };

    return (
        <Link to={`/About/${item.id}`}>
            <div className="cardStyle">
                <img
                    src={item.image}
                    alt={item.title}
                    className="imageStyle"
                    width={200}
                    height={300}

                />
                <div>
                    <h3 className='title' style={{ color: "black" }} >{item.title}</h3>
                    <button
                        onClick={handleFavoriteToggle}
                        className='buttonStyle'
                    >
                        {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
                    </button>
                </div>
            </div>
        </Link>
    );
}

export default Item;
