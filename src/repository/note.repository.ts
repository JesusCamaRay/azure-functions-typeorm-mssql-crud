import {Note} from '../entity'
import Database from '../config/db.config';
import {CreateNoteDTO, UpdateNoteDTO} from '../dto'
import { Connection } from 'typeorm';

export class NoteRepository {

  private connection: any;
  private noteRepository: any;

  constructor(connection:Connection) {
      this.connection = connection
      this.noteRepository = this.connection.getRepository(Note);
    }
    
    async find() {
      try {
          const notes = await this.noteRepository.find();
          return notes;
      } catch (err) {
          throw Error(err);
      }
  }

  async findOne(id:number){
    try {
      const note = await this.noteRepository.findOne(id)
      return note
    } catch (error) {
      throw Error(error);
    }
  }

  async create(payload:CreateNoteDTO) {
      try {
        const note = new Note();
        note.title = payload.title;
        note.description = payload.description;
        const newNote = await this.noteRepository.save(note);
        return newNote
      } catch(err) {
        throw Error(err);
      }
  }

  async update(id:number,payload:UpdateNoteDTO) {
      try {
        const note = await this.noteRepository.findOne(id);
        if(!note) {
          throw Error(`Note with id ${id} not found`);
        }

        const {title, description} = payload;
        
        if(title) {
          note.title = title;
        }
        if(description) {
          note.description = description;
        }

        const updatedNote = await this.noteRepository.save(note);
        return updatedNote
      } catch(err) {
        throw Error(err);
      }
  }

  async delete(id:number) {
      try {
        const note = await this.noteRepository.findOne(id);
        if(!note) {
          throw Error(`Note with id ${id} not found`)
        }

        await this.noteRepository.delete(id);
      } catch(err) {
        throw Error(err);
      }
  }

}