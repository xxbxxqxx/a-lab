import React from 'react';
import Link from 'next/link';

const Menu = ({ open }) => {

  return (
    <div className="menuSlide" style={open ? {transform: "translateX(0)"} : {transform: "translateX(100%)"}}>
      <div className="menuTitle">
        <span role="img" aria-label="price" className="icon">&#x1f4c1;</span>
        カテゴリー
        <ul className="categories">
          <li><Link href="">メニュー1</Link></li>
          <li><Link href="">メニュー2</Link></li>
          <li><Link href="">メニュー3</Link></li>
          <li><Link href="">メニュー4</Link></li>
        </ul>
      </div>
    </div>
  )
}
export default Menu;