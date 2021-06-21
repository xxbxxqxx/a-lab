import React from 'react';
import Link from 'next/link';
import { Link as LinkRS, animateScroll as scroll } from "react-scroll"

const Menu = ({ open }) => {

  return (
    <div className="menuSlide" style={open ? { transform: "translateX(0)" } : { transform: "translateX(100%)" }}>
      <div className="menuTitle">
        <span role="img" aria-label="price" className="icon">&#x1f4c1;</span>
        カテゴリー
        <ul className="categories">
          <li>
            <LinkRS
              activeClass="active"
              to="reasons"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              選ばれる理由
                </LinkRS>

          </li>

          <li>
            <LinkRS
              activeClass="active"
              to="job"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              求人情報
            </LinkRS>
          </li>

          <li>
            <LinkRS
              activeClass="active"
              to="users-voice"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              利用者の声
            </LinkRS>
          </li>

          <li>
            <LinkRS
              activeClass="active"
              to="flow"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              ご利用の流れ
            </LinkRS>
          </li>


          <li>
            <LinkRS
              activeClass="active"
              to="qa"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Q&A
            </LinkRS>
          </li>

          <li>
            <LinkRS
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              会社概要
            </LinkRS>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Menu;