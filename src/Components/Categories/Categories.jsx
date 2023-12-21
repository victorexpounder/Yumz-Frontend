import React, { useState } from 'react'
import pizza from '../../Assets/pizza.png'
import './Categories.scss'
import axios from 'axios'
export const Categories = ({setRecipePosts}) => {
    const CategoriesData = [
        {name: 'Pizza', image: pizza},
        {name: 'Drinks', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Sandwich', image: "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Sandwich.png"},
        {name: 'Salad', image: "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Salad.png"},
        {name: 'Snacks', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/fastfood.png"},
        {name: 'Rice', image: "data:image/png;base64,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"},
        {name: 'Asian', image: "https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Asian.png"},
        {name: 'Dessert', image: "	https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Dessert.png"},
        {name: 'African', image: "	https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Soup.png"},
        {name: 'Italian', image: "	https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/Italian.png"},
        {name: 'American', image: "	https://cn-geo1.uber.com/static/mobile-content/eats/cuisine-filters/v1/American.png"},
    ]
    const [feed, setFeed] = useState(true);
    const [trending, setTrending] = useState(false);
    const [following, setFollowing] = useState(false);

    const fetchByTags = async(name)=>{
      const res = await axios.get(`/api/recipes/tags?categories=${name.toLowerCase()}`)
      setRecipePosts(res.data);
      setFeed(false);
      setFollowing(false);
      setTrending(false);
    }
    const fetchData = async() =>{
      try{
        const res = await axios.get(`/api/recipes/random`)
        console.log(res.data)
        setRecipePosts(res.data)
        setFeed(true);
        setFollowing(false);
        setTrending(false)
      }catch(err){
        
        console.log(err)
      }
    }
    const fetchTrending = async() =>{
      try{
        const res = await axios.get(`/api/recipes/trend`)
        console.log(res.data)
        setRecipePosts(res.data)
        setFeed(false);
        setFollowing(false);
        setTrending(true)
      }catch(err){
        
        console.log(err)
      }
    }

    const fetchFollowed = async() =>{
      try{
        const res = await axios.get(`/api/recipes/followedVid`)
        console.log(res.data)
        setRecipePosts(res.data)
        setFeed(false);
        setFollowing(true);
        setTrending(false);
      }catch(err){
        
        console.log(err)
      }
    }

  return (
    <div className='categories'>
        <div className="categoriesCont">
          {CategoriesData.map(({name, image})=>{ return(
            <div className="category" onClick={()=> fetchByTags(name)}>
                <div className="imgcont">
                <img src={image} alt="ooppss" />
                </div>
                <p>{name}</p>
            </div>
          )})}
        </div>
        <div className="types">
          <div className={`cirCon ${feed? 'active' : ''}`} onClick={fetchData}> Feed </div>
          <div className={`cirCon ${trending? 'active' : ''}`} onClick={fetchTrending}> Trending </div>
          <div className={`cirCon ${following? 'active' : ''}`} onClick={fetchFollowed}> Following </div>
        </div>
    </div>
  )
}
