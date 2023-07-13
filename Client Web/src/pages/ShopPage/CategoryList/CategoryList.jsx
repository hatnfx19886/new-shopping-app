import { useState } from 'react';
import classes from './CategoryList.module.css';

// Default Category List
const categoryList = [
  {
    category: 'All',
    active: true,
  },
  {
    category: 'iPhone',
    active: false,
  },
  {
    category: 'iPad',
    active: false,
  },
  {
    category: 'Macbook',
    active: false,
  },
  {
    category: 'Airpod',
    active: false,
  },
  {
    category: 'Watch',
    active: false,
  },
  {
    category: 'Mouse',
    active: false,
  },
  {
    category: 'Keyboard',
    active: false,
  },
  {
    category: 'Other',
    active: false,
  },
];
const CategoryList = (props) => {
  const [category, setCategory] = useState(categoryList);
  const changeCategory = (e) => {
    const index = e.target.id;
    // Set all category active is false
    const newCategory = categoryList.map((x) => {
      return {
        category: x.category,
        active: false,
      };
    });
    // Set new category active is true
    newCategory[index] = {
      category: categoryList[index].category,
      active: true,
    };
    // Update Category List
    setCategory(newCategory);
    props.changeListHandler(e.target.outerText);
  };
  return (
    <div className={classes.category}>
      <h4>CATEGORIES</h4>
      <ul>
        <li className={classes.apple}>APPLE</li>
        <li
          className={`${
            category[0].active ? classes.active : classes.inactive
          }`}
          onClick={changeCategory}
          id={0}
        >
          {category[0].category}
        </li>
        <li className={classes.group}>iphone & mac</li>
        <li
          className={`${
            category[1].active ? classes.active : classes.inactive
          }`}
          onClick={changeCategory}
          id={1}
        >
          {category[1].category}
        </li>
        <li
          className={`${
            category[2].active ? classes.active : classes.inactive
          }`}
          onClick={changeCategory}
          id={2}
        >
          {category[2].category}
        </li>
        <li
          className={`${
            category[3].active ? classes.active : classes.inactive
          }`}
          onClick={changeCategory}
          id={3}
        >
          {category[3].category}
        </li>
        <li className={classes.group}>wireless</li>
        <li
          className={`${
            category[4].active ? classes.active : classes.inactive
          }`}
          onClick={changeCategory}
          id={4}
        >
          {category[4].category}
        </li>
        <li
          className={`${
            category[5].active ? classes.active : classes.inactive
          }`}
          onClick={changeCategory}
          id={5}
        >
          {category[5].category}
        </li>
        <li className={classes.group}>other</li>
        <li
          className={`${
            category[6].active ? classes.active : classes.inactive
          }`}
          onClick={changeCategory}
          id={6}
        >
          {category[6].category}
        </li>
        <li
          className={`${
            category[7].active ? classes.active : classes.inactive
          }`}
          onClick={changeCategory}
          id={7}
        >
          {category[7].category}
        </li>
        <li
          className={`${
            category[8].active ? classes.active : classes.inactive
          }`}
          onClick={changeCategory}
          id={8}
        >
          {category[8].category}
        </li>
      </ul>
    </div>
  );
};

export default CategoryList;
