import React from 'react';
import styles from './AboutUs.module.css';
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import DocumentTitle from '../components/Helmet/Helmet';


const teamMembers = [
  {
    name: 'Ranjan Palai',
    expert: 'Full Stack Developer',
    image: 'https://avatars.githubusercontent.com/u/107481896?v=4',
    github: "https://github.com/ranjanpalai69",
    linked: "https://www.linkedin.com/in/ranjan-palai19/",
    portfolio: "https://ranjanpalai69.github.io/"
  }
  
];

const About = () => {

  return (
    <>
      <DocumentTitle pageTitle={"| ABOUT US"} />
      <div className={styles.__about__us__main__container}>
      <h1>About Us</h1>
      <p className={styles.__about__us__desc} >Reliability and dependability are key characteristics of our team members, 
        as we understand the importance of meeting deadlines and fulfilling our commitments.</p>
      <h2>Team Members</h2>
      <div className={styles.__team__members__container}>
        {teamMembers.map((member) => (
          <div key={member.name} className={styles.__team__member}>
            <img src={member.image} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.expert} </p>
            <p>{member.contribution}</p>

            <div>
              <a href={member.github} target='_blank'>
                <AiFillGithub  />
              </a>
              <a href={member.linked} target='_blank' >
                <AiFillLinkedin  />
              </a>

              <a href={member.portfolio} target='_blank' >
                <CgProfile  />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default About;
