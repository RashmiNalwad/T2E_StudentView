import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';

declare function require(a)
var PouchDB = require('pouchdb');

@Injectable()
export class Data {
    db: any;
    username: string;
    password: string;
    remote: any;
    data;
    constructor() {
        // this.db = new PouchDB('http://127.0.0.1:5984/teach2educate');
        // this.db = new PouchDB('https://rashmi2212:Teach2Educate@rashmi2212.cloudant.com/t2e');
        this.db = new PouchDB('https://teach2educate:educate2teach@teach2educate.cloudant.com/t2edb');

        /*this.db = new PouchDB('teach2educate_pouch');
        this.username = 'admin';
        this.password = 'admin';
        this.remote = 'http://127.0.0.1:5984/teach2educate';

        let options = {
        live: true,
        retry: true,
        continuous: true,
        auth: {
            username: this.username,
            password: this.password
        }
        };

        this.db.sync(this.remote, options);*/
    }

  getUserInfo(username){
    return new Promise(resolve => {
      this.db.get(username).then(function(doc){
          resolve(doc);
      }).catch(function(err){
          console.log(err);
      })
    });
  }

  getStudentClassChapInfo(username){
    return new Promise(resolve => {
      this.db.get(username).then(function(doc){
          resolve(doc);
      }).catch(function(err){
          console.log(err);
      })
    });
  }

  addClassGrp(classGrp, email){
    var dbaccess = this;
    return new Promise(resolve => {
      this.db.put({
      _id: classGrp,
      chapters: [],
      students: [],
      teachers: []
      }).then(function (response) {
        console.log(response);
        return dbaccess.db.get(email);
      }).then(function(doc){
        doc.class_subject.push(classGrp);
        //return dbaccess.db.put(doc);
          resolve(dbaccess.db.put(doc));
      }).catch(function (err) {
        console.log(err);
        resolve(err);
      });
    });
  }

  addChapter(chapter, classGrp){
      var dbaccess = this;
      var chapterName = chapter;
      return new Promise(resolve => {
        this.db.get(classGrp).then(function(classDoc){
        console.log(chapterName);
        let chapterRecord ={};
        chapterRecord[chapterName] = { "assignments" : [] } ;
        classDoc.chapters.push(chapterRecord);
        resolve(dbaccess.db.put(classDoc));
      }).catch(function (err) {
        console.log(err);
        resolve(err);
      });
    });
  }

  addAssignment(assignment, classGrp, chapter, description_detail, duration, assignedOnDateString, softDeadlineDateString, hardDeadlineDateString){
    var dbaccess = this;
    var chapterName = chapter;
    var assignmentKey = "assignment_" + assignment;
    var assignmentName = assignment;
    return new Promise(resolve => {
      dbaccess.db.put({
        _id: assignmentKey,
        description: description_detail,
        max_response_duration_min: duration,
        responses: {},
        teacher_reviewed: [],
        teacher_yet_to_review: [],
        assigned_on : assignedOnDateString,
        soft_deadline_due : softDeadlineDateString,
        hard_deadline_due : hardDeadlineDateString
      }).then(function (response) {
          console.log(response);
          return(dbaccess.db.get(classGrp));
      }).then(function(classDoc){
          classDoc["chapters"][chapter]["assignments"].push(assignmentName);
          /*for (let chapterObj of classDoc.chapters){
            if( (Object.keys(chapterObj)[0]) == chapterName){
              chapterObj[chapterName]["assignments"].push(assignmentName);
              console.log(chapterObj[chapterName]["assignments"]);
            }
          }*/
          resolve(dbaccess.db.put(classDoc));
      }).catch(function (err) {
          console.log(err);
          resolve(err);
      });
    });
  }

  getChapters(classGrp){
    return new Promise(resolve => {
      this.db.get(classGrp).then(function(doc){
          resolve(doc);
      }).catch(function(err){
          console.log(err);
      })
    });
  }

  getAssignments(classGrp, chapter){
    return new Promise(resolve => {
      this.db.get(classGrp).then(function(doc){
          resolve(doc["chapters"][chapter]);
      }).catch(function(err){
          console.log(err);
      })
    });
  }

  getAssignmentInfo(assignment){
    return new Promise(resolve => {
      this.db.get("assignment_" + assignment).then(function(doc){
          resolve(doc);
      }).catch(function(err){
          console.log(err);
      })
    });
  }

getQuestions(){
 return new Promise(resolve => {
   this.db.get("review_questions").then(function(doc){
       console.log(doc);
       resolve(doc);
   }).catch(function(err){
       console.log(err);
   })
 });
}

submitPeerFeedback(assignment,reviewer,student_id,q1,ans1,q2,ans2,q3,ans3){
 var dbaccess = this;
 return new Promise(resolve => {
     this.db.get("assignment_" + assignment).then(function(assignmentDoc){
     console.log(assignmentDoc);
     let q_ans_map = {};
     q_ans_map[q1]=ans1;
     q_ans_map[q2]=ans2;
     q_ans_map[q3]=ans3;
     assignmentDoc["responses"][student_id]["peers_feedback"][reviewer] = q_ans_map;
     console.log(assignmentDoc);
     resolve(dbaccess.db.put(assignmentDoc));
   }).catch(function (err) {
     console.log(err);
     resolve(err);
   });
 });
}

  submitReview(assignment, student_id, teacher_reviewed, teacher_feedback){
    var dbaccess = this;
    return new Promise(resolve => {
        this.db.get("assignment_" + assignment).then(function(assignmentDoc){
        console.log(assignmentDoc);

        assignmentDoc["responses"][student_id]["teacher_reviewed"] = teacher_reviewed;
        assignmentDoc["responses"][student_id]["teacher_feedback"] = teacher_feedback;

        //remove student_id from teacher_yet_to_review
        let updated_teacher_yet_to_review = [];
        console.log(assignmentDoc["teacher_yet_to_review"]);
        for(let existing_student_id of assignmentDoc["teacher_yet_to_review"])
        {
          if(existing_student_id === student_id)
            continue;
          else
            updated_teacher_yet_to_review.push(existing_student_id);
        }
        assignmentDoc["teacher_yet_to_review"] = updated_teacher_yet_to_review;
        console.log(assignmentDoc["teacher_yet_to_review"]);
        //add student_id to teacher_reviewed
        assignmentDoc["teacher_reviewed"].push(student_id);

        console.log(assignmentDoc);
        resolve(dbaccess.db.put(assignmentDoc));
      }).catch(function (err) {
        console.log(err);
        resolve(err);
      });
    });
  }

  deadlineUpdate(assignment, soft_deadline_due, hard_deadline_due){
    var dbaccess = this;
    return new Promise(resolve => {
        this.db.get("assignment_" + assignment).then(function(assignmentDoc){
        //console.log(assignmentDoc);
        assignmentDoc["soft_deadline_due"] = soft_deadline_due;
        assignmentDoc["hard_deadline_due"] = hard_deadline_due;
        //console.log(assignmentDoc);
        resolve(dbaccess.db.put(assignmentDoc));
      }).catch(function (err) {
        console.log(err);
        resolve(err);
      });
    });
  }

  getDocuments(){

    return new Promise(resolve => {

      this.db.allDocs({

        include_docs: true

      }).then((result) => {

        this.data = [];

        let docs = result.rows.map((row) => {
          this.data.push(row.doc);
          resolve(this.data);
        });

        this.db.changes({live: true, since: 'now', include_docs: true}).on('change', (change) => {
          this.handleChange(change);
        });

      }).catch((error) => {

        console.log(error);

      });

    });

  }
    handleChange(change){

    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {

      if(doc._id === change.id){
        changedDoc = doc;
        changedIndex = index;
      }

    });

    //A document was deleted
    if(change.deleted){
      this.data.splice(changedIndex, 1);
    }
    else {

      //A document was updated
      if(changedDoc){
        this.data[changedIndex] = change.doc;
      }
      //A document was added
      else {
        this.data.push(change.doc);
      }

    }

  }


}
