package controller;


import model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import service.Student_Service;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/api")

public class Controller {

    @Autowired
    private Student_Service studentService;

    @PostMapping
    public boolean saveStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    @GetMapping("students-list")
    public List<Student> allstudents() {
        return studentService.getStudent();
    }

    @DeleteMapping("delete-student/{student_id}")
    public boolean deleteStudent(@PathVariable("student_id") int student_id, Student student) {
        student.setStudent_id(student_id);
        return studentService.deleteStudent(student);

    }

    @GetMapping("student/{student_id}")
    public List<Student> allstudentByID(@PathVariable("student_id") int student_id, Student student) {
        student.setStudent_id(student_id);
        return studentService.getStudent(student);

    }

    @PostMapping()
    public boolean updateStudent(@RequestBody Student student, @PathVariable("student_id") int student_id){
        student.setStudent_id(student_id);
        return studentService.updateStudent(student);
    }
}