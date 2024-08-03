package DAO;

import model.Student;

import java.util.List;


// The Student_DAO interface declares five methods.
// Each method represents a CRUD (Create, Read, Update, Delete) operation for the Student entity:

public interface Student_DAO {
//  SAVES NEW STUDENT OBJ TO DB
    public boolean saveStudent(Student student);

//  RETRIEVES LIST OF ALL STUDENTS OBJ FROM DB
    public List<Student> getStudents();

//  DELETES STUDENT OBJ FROM DB
//  Returns: A boolean indicating success (true) or failure (false) of the delete operation.
    public boolean deleteStudent(Student student);

//  Retrieves a list of Student objects based on some identifier.
    public List<Student> getStudentsByID(Student student);

    List<Student> getStudentByID(Student student);

    public boolean updateStudent(Student student);
}
