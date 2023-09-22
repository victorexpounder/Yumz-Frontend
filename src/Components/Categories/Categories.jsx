import React from 'react'
import pizza from '../../Assets/pizza.png'
import './Categories.scss'
export const Categories = () => {
    const CategoriesData = [
        {name: 'Pizza', image: pizza},
        {name: 'Drinks', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Convenience', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/convenience.png"},
        {name: 'Drinks', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/alcohol.png"},
        {name: 'Fast Food', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/fastfood.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
        {name: 'Burgers', image: "https://d4p17acsd5wyj.cloudfront.net/shortcuts/cuisines/burger.png"},
    ]
  return (
    <div className='categories'>
        <div className="categoriesCont">
          {CategoriesData.map(({name, image})=>{ return(
            <div className="category">
                <div className="imgcont">
                <img src={image} alt="ooppss" />
                </div>
                <p>{name}</p>
            </div>
          )})}
            
        </div>
    </div>
  )
}
