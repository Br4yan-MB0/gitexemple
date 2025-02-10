<<<<<<< HEAD
import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';
//import '../styles/Match.css';

const MatchCard = ({ user, onLike, onDislike }) => {
  if (!user) {
    return <p>Carregando...</p>; // Adiciona fallback caso user seja undefined
  }

  return (
    <motion.div
      className="match-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={user.profileImage || "/default-image.jpg"} alt="Profile" />
      <h3 className="user-name">{user.name ? `${user.name}, ${user.age || "Idade não informada"}` : "Nome não disponível"}</h3>
      <p className="user-location">{user.location || "Localização não disponível"}</p>
      <div className="post-examples">
        {Array.isArray(user.posts) && user.posts.length > 0 ? (
          user.posts.slice(0, 2).map((post, index) => (
            <div key={index} className="post-preview">{post}</div>
          ))
        ) : (
          <p>Sem posts disponíveis</p>
        )}
      </div>
      <div className="buttons">
        <button className="dislike" onClick={() => onDislike?.(user.id)}>
          <X size={24} />
        </button>
        <button className="like" onClick={() => onLike?.(user.id)}>
          <Heart size={24} />
        </button>
      </div>
    </motion.div>
  );
};

export default MatchCard;
=======
import React from 'react';
import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';
//import '../styles/Match.css';

const MatchCard = ({ user, onLike, onDislike }) => {
  if (!user) {
    return <p>Carregando...</p>; // Adiciona fallback caso user seja undefined
  }

  return (
    <motion.div
      className="match-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={user.profileImage || "/default-image.jpg"} alt="Profile" />
      <h3 className="user-name">{user.name ? `${user.name}, ${user.age || "Idade não informada"}` : "Nome não disponível"}</h3>
      <p className="user-location">{user.location || "Localização não disponível"}</p>
      <div className="post-examples">
        {Array.isArray(user.posts) && user.posts.length > 0 ? (
          user.posts.slice(0, 2).map((post, index) => (
            <div key={index} className="post-preview">{post}</div>
          ))
        ) : (
          <p>Sem posts disponíveis</p>
        )}
      </div>
      <div className="buttons">
        <button className="dislike" onClick={() => onDislike?.(user.id)}>
          <X size={24} />
        </button>
        <button className="like" onClick={() => onLike?.(user.id)}>
          <Heart size={24} />
        </button>
      </div>
    </motion.div>
  );
};

export default MatchCard;
>>>>>>> dd736f7be0b2b91bdbcbf30cd1b7312c84b915af
