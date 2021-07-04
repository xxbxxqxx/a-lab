import React from 'react';
import Link from 'next/link';
import { Link as LinkRS, animateScroll as scroll } from "react-scroll"

const Menu = ({ open, setOpen }) => {

  const handleChange2 = (e) => {
    setOpen(false)
  }

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
              <button onClick={handleChange2}>
                選ばれる理由
              </button>
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
              <button onClick={handleChange2}>
                求人情報!
              </button>
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
              <button onClick={handleChange2}>
                利用者の声
              </button>
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
              <button onClick={handleChange2}>
                ご利用の流れ
              </button>
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
              <button onClick={handleChange2}>
                Q&A
              </button>
            </LinkRS>
          </li>

          <li>
            <LinkRS
              activeClass="active"
              to="open-gate"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              <button onClick={handleChange2}>
                OpenGateとは
              </button>

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
              <button onClick={handleChange2}>
                会社概要
              </button>

            </LinkRS>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Menu;