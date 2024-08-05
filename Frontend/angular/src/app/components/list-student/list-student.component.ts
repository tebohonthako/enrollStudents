import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { Student } from 'src/app/student';
import {FormControl,FormGroup,Validators} from '@angular/forms';  


@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent {
  studentupdateform?: FormGroup<{ student_id: FormControl<any>; student_name: FormControl<any>; student_email: FormControl<any>; student_branch: FormControl<any>; }>;


  constructor (private studentService : StudentService){}

  students: Observable<Student[]> | any;  
  student : Student=new Student();  
  // deleteMessage=false;  
  // studentlist:any;  
  // isupdated = false;   

  
  ngOnInit() {  
   
      
    this.studentService.getStudentList().subscribe(data =>{  
    this.students =data;  
    })  

      }; 


//       deleteStudent(id: number) {  
//         this.studentService.deleteStudent(id)  
//           .subscribe(  
//             data => {  
//               console.log(data);  
//               this.deleteMessage=true;  
//               this.studentService.getStudentList().subscribe(data =>{  
//                 this.students =data  
//                 })  
//             },  
//             error => console.log(error));  
//       } 

//       updateStudent(id: number){  
//         this.studentService.getStudent(id)  
//           .subscribe(  
//             data => {  
//               this.studentlist=data;
//               this.studentupdateform=new FormGroup({  
//                 student_id:new FormControl(data.student_id), 
//                 student_name:new FormControl(data.student_name),  
//                 student_email:new FormControl(data.student_email),  
//                 student_branch:new FormControl(data.student_branch)  
//               });  
//             },  
//             error => console.log(error));  
//       }
      
//       updateStu(updstu: any){  
//         this.student=new Student();   
//        this.student.student_id=this.StudentId.value;  
//        this.student.student_name=this.StudentName.value;  
//        this.student.student_email=this.StudentEmail.value;  
//        this.student.student_branch=this.StudentBranch.value;  
//        console.log(this.StudentBranch.value);  

//        this.studentService.updateStudent(this.student.student_id,this.student).subscribe(  
//         data => {       
//           this.isupdated=true;  
//           this.studentService.getStudentList().subscribe(data =>{  
//             this.students =data  
//             })  
//         },  
//         error => console.log(error));  
//       }   

//       get StudentName(){  
//         return this.studentupdateform?.get('student_name');  
//       }  
//       get StudentEmail(){  
//         return this.studentupdateform?.get('student_email');  
//       }  
      
//       get StudentBranch(){  
//         return this.studentupdateform?.get('student_branch');  
//       }  
      
//       get StudentId(){  
//         return this.studentupdateform?.get('student_id');  
//       }  
      
//       changeisUpdate(){  
//         this.isupdated=false;  

//       }
// 
}