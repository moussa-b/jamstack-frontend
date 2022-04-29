import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  displayedColumns  :  string[] = ['id', 'name', 'title', 'email', 'phone', 'address', 'city', 'actions'];
  dataSource: Contact[] = [];
  contact: Contact = new Contact();
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.readContacts();
  }

  private readContacts() {
    this.apiService.readContacts().subscribe((result: Contact[]) => {
      this.dataSource = result;
    })
  }

  selectContact(contact: Contact){
    this.contact = contact;
  }

  newContact(){
    this.contact = new Contact();
  }

  createContact(f: any){
    this.apiService.createContact(f.value).subscribe((result)=>{
      console.log(result);
      this.newContact();
      this.readContacts();
    });

  }

  deleteContact(id: number){
    this.apiService.deleteContact(id).subscribe((result)=>{
      console.log(result);
      if (this.contact.id === id) {
        this.newContact();
      }
      this.readContacts();
    });
  }

  updateContact(f: any){
    f.value.id = this.contact['id'];
    this.apiService.updateContact(f.value).subscribe((result: Contact)=>{
      console.log(result);
      this.readContacts();
    });
  }

}
