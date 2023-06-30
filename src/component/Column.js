import React, { useState } from "react";
import { Data } from './data';


function TABLE() {
	const [users, setUsers] = useState(Data);
	const [sorted, setSorted] = useState({ sorted: "id", reversed: false });
	const [searchPhrase, setSearchPhrase] = useState("");

	//pagination

	const [currentPage, setCurrentPage] = useState(0);
	const pageSize = 10;

	const pageCount = Math.ceil(Data.length / pageSize);


	const currentData = users.slice(
		currentPage * pageSize,
				(currentPage + 1) * pageSize
	  );

	
	  const previous = () => {
		if(currentPage !== 0){
			setCurrentPage(currentPage - 1)
		}
	  }

	  const next = () => {
		if(currentPage !== pageCount-1){
			setCurrentPage(currentPage + 1)
		}
	  }

	  // sorting


	const sortByAge = () => {
		const usersCopy = [...users];
		usersCopy.sort((userA, userB) => {
			if (sorted.reversed) {
				return userA.age - userB.age;
			}
			return userB.age - userA.age;
		});
		setUsers(usersCopy);
		setSorted({ sorted: "id", reversed: !sorted.reversed });
	};

	const sortByName = () => {
		const usersCopy = [...users];
		usersCopy.sort((userA, userB) => {
			const fullNameA = `${userA.firstName} ${userA.lastName}`;
			const fullNameB = `${userB.firstName} ${userB.lastName}`;
			if (sorted.reversed) {
				return fullNameB.localeCompare(fullNameA);
			}
			return fullNameA.localeCompare(fullNameB);
		});
		setUsers(usersCopy);
		setSorted({ sorted: "name", reversed: !sorted.reversed });
	};

	const search = (event) => {
		const matchedUsers = Data.filter((user) => {
			return `${user.firstName} ${user.lastName}`
				.toLowerCase()
				.includes(event.target.value.toLowerCase());
		});

		setUsers(matchedUsers);
		setSearchPhrase(event.target.value);
	};

	const renderUsers = () => {
		return currentData.map((user, i) => {
			return (
				<tr key={i}>
					
					<td>{user.firstName} </td>
          			<td>{user.lastName} </td>
					<td>{user.email}</td>
					<td>{user.age}</td>
				</tr>
			);
		});
	};


	return (
        
		
			  
		<div className="container">
     	<div className="heading">
			<h3>
				Table
			</h3>
		</div>

			<div className='search d-flex justify-content-between'>
        <form className='d-flex input-group w-auto'>
		<input  style={{width:"250px",marginLeft:"10px"}}
              className="form-control form-control-sm"
					type="text"
					placeholder="Search"
					value={searchPhrase}
					onChange={search}
				/>
         </form>

        <select className="form-select form-select-sm"
		  style={{width:"3cm",marginLeft:"10px"}}>
          <option>Sort by...</option>
          <option onClick={sortByName}>Name</option>
          <option onClick={sortByAge}>Age</option>
        </select>
        </div>

				
        
			
			<div style={{overflowX:"auto"}} className="table-container">
				<table className="table table-hover">
					<thead>
						<tr>
             <th className="table-dark"  scope="col">
								<span>FirstName</span>
								
							</th>
              <th className="table-dark"  scope="col">
								<span>LastName</span>
								
							</th>
							<th className="table-dark" scope="col">
								<span>Email</span>
               
							</th>
							<th  className="table-dark" scope="col">
								<span>Age</span>
                
							</th>
						</tr>
					</thead>
					<tbody>{renderUsers()}</tbody>
				</table>
			</div>

			<div className="d-flex justify-content-center">
			
<nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><button className="page-link" onClick={previous}>Previous</button></li>
   
    <li className="page-item"><button className="page-link" onClick={next}>Next</button></li>
  </ul>
</nav>
			</div>
</div>

	);

	
}

export default TABLE;