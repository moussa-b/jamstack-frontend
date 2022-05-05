import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) {
  }

  public readContacts(){
    return this.httpClient.get<Contact[]>(`${environment.API_SERVER}/contacts`);
  }

  public createContact(contact: Contact){
    return this.httpClient.post<Contact>(`${environment.API_SERVER}/contacts/create`, contact);
  }

  public updateContact(contact: Contact){
    return this.httpClient.put<Contact>(`${environment.API_SERVER}/contacts/${contact.id}/update`, contact);
  }

  public deleteContact(id: number){
    return this.httpClient.delete(`${environment.API_SERVER}/contacts/${id}/delete`);
  }
}
