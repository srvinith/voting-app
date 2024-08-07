import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Results() {
  const [members, setMembers] = useState([]);
  const [highestVoteMember, setHighestVoteMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/members');
      const members = response.data;
      setMembers(members);
      findHighestVoteMember(members);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const findHighestVoteMember = (members) => {
    if (members.length === 0) return;
    const highestVoteMember = members.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );
    setHighestVoteMember(highestVoteMember);
  };

  return (
    <div className="container">
      <div className="Results">
        <h1 className="text-center my-5">Voting Results</h1>
        <div className="row">
          {members.map((member) => (
            <div className="col-md-3" key={member._id}>
              <div className="cards">
                <div className="card-img">
                  <img src='/images/user.png' className="card-img-top" alt="..." />
                </div>
                <h5 className="card-title">{member.name}</h5>
                <h2 style={{ color: highestVoteMember && highestVoteMember._id === member._id ? 'green' : 'white' }}>
                  {member.votes}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;
