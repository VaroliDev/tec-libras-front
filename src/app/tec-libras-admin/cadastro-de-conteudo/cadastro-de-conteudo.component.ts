import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-de-conteudo',
  standalone: true, // 
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent], 
  templateUrl: './cadastro-de-conteudo.component.html',
  styleUrl: './cadastro-de-conteudo.component.scss'
})
export class CadastroDeConteudoComponent implements OnInit {
  topicForm!: FormGroup

  constructor(private fb: FormBuilder, private router: Router,) {}

  ngOnInit() {
    this.topicForm = this.fb.group({
      level_id: [''],
      title: [''],
      description: [''],
      theory_content: [''],
      practice_signs: [''],
      video_url: [''],
      questions: this.fb.array([]),
      curiosities: ['']
    })

    // Inicializa 5 perguntas
    const questionsArray = this.topicForm.get('questions') as FormArray
    for (let i = 0; i < 5; i++) {
      questionsArray.push(this.fb.group({
        question_text: [''],
        options: [''],
        correct_answer: [''],
        explanation:['']
      }))
    }
  }

  get questions() {
    return this.topicForm.get('questions') as FormArray
  }

  submit() {
    console.log(this.topicForm.value)
  }

  pagadmin() {
    this.router.navigate(['/admin']);
  }
}
