import { useEffect, useRef, useState } from "react";
import StudentModal from "./StudentModal";

const StudentList = () => {
  const [studentList, setStudentList] = useState([
    { name: "Manh", phone: "0123456789", email: "manh@gmail.com" },
    { name: "Bi", phone: "0123456789", email: "trang@gmail.com" },
    { name: "Cam", phone: "0123456789", email: "trang@gmail.com" },
    { name: "Trang", phone: "0123456789", email: "trang@gmail.com" },
    { name: "Quan", phone: "0123456789", email: "quan@gmail.com" },
    { name: "An", phone: "0938279842", email: "quan@gmail.com" },
    { name: "Nhghi", phone: "0846281618", email: "quan@gmail.com" },
    { name: "Thuyen", phone: "0487236872", email: "quan@gmail.com" },
    { name: "Quan", phone: "0478978633", email: "quan@gmail.com" },
  ]);
  
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  
  const [searchTerm, setSearchTerm] = useState("");
  
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [indexSelected, setIndexSelected] = useState(-1);
  const [isValid, setIsValid] = useState(false);
  const closeModal = useRef(null);

  useEffect(() => {
    const { name, phone, email } = form;
    const isValid = name && phone && email;
    setIsValid(isValid);
  }, [form]);

  useEffect(() => {
    document.title = "Student List";
  }, []);

  const handleSelect = (studentSelected, index) => {
    setForm({ ...studentSelected });
    setIndexSelected(index);
  };

  const handleChange = (event) => {
    const newForm = { ...form };
    newForm[event.target.name] = event.target.value;
    setForm({
      ...newForm,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const newList = [...studentList];
      if (indexSelected > -1) {
        newList.splice(indexSelected, 1, form);
      } else {
        newList.push(form);
      }
      setForm({ name: "", phone: "", email: "" });
      setStudentList(newList);
      setIsValid(false);
      setIndexSelected(-1);
    }
  };

  const handleDelete = (index) => {
    const newList = [...studentList];
    newList.splice(index, 1);
    setStudentList(newList);
  };

  const handleSearch = () => {
    return studentList
      .filter((student) => {
        const searchText = searchTerm.toLowerCase();
        return (
          student.name.toLowerCase().includes(searchText) ||
          student.phone.includes(searchText) ||
          student.email.toLowerCase().includes(searchText)
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const totalPages = Math.ceil(studentList.length / recordsPerPage);
  const displayedStudents = handleSearch().slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return (
    <div className="table-wrapper">
      <div className="table-title">
        <div className="row">
          <div className="col-sm-6">
            <h2>
              Student <b>List</b>
            </h2>
          </div>
          <div className="col-sm-6">
            <a
              href="#EmployeeModal"
              className="btn btn-success"
              data-toggle="modal"
            >
              <i className="material-icons">&#xE147;</i>{" "}
              <span>Add New Student</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="search-bar">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, phone, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th style={{ width: "200px" }}>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayedStudents.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.phone}</td>
              <td>{student.email}</td>
              <td>
                <a
                  href="#EmployeeModal"
                  className="edit"
                  data-toggle="modal"
                  onClick={() => handleSelect(student, index)}
                >
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Edit"
                  >
                    &#xE254;
                  </i>
                </a>
                <a
                  href="#deleteEmployeeModal"
                  className="delete"
                  data-toggle="modal"
                  onClick={() => handleDelete(index)}
                >
                  <i
                    className="material-icons"
                    data-toggle="tooltip"
                    title="Delete"
                  >
                    &#xE872;
                  </i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn ${currentPage === i + 1 ? "btn-primary" : ""}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <StudentModal
        name={form.name}
        email={form.email}
        phone={form.phone}
        indexSelected={indexSelected}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        isValid={isValid}
        closeModal={closeModal}
      />
    </div>
  );
};

export default StudentList;
