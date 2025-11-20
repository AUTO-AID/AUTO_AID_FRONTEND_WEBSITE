import React from 'react';
import { teamData } from '../contacts';

const TeamSection = () => {
    return (
        <>
       
            <section id="team" className="section">
                <div className="app-container">
                    <h2 className="section-title">Our Team</h2>
                    <p className="section-subtitle"><b>Professional Automotive Service Experts</b></p>
                    <div className="team-container">
                        {teamData.map((member, index) => (
                            <div className="team-card" key={index}>
                                <div className="team-img-wrap">
                                    <img src={member.img} alt={member.name} />
                                </div>
                                <h4>{member.name}</h4>
                                <p className="role">{member.role}</p>
                                <p className="desc">{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default TeamSection;