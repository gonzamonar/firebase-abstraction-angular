import { Injectable } from '@angular/core';
import { Firestore, QueryFieldFilterConstraint, QueryOrderByConstraint, addDoc, collection,
         collectionData, getDocs, limit, query, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    private firestore: Firestore,
  ) { }


  async pushOne(table: string, data: any) {
    let dataCollection = collection(this.firestore, table);
    addDoc(dataCollection, data);
  }


  async fetchOne(table: string, where: QueryFieldFilterConstraint): Promise<any> {
    let col = collection(this.firestore, table);
    const fetchQuery = query(
      col, 
      where,
      limit(1),
    );
    const querySnapshot = await getDocs(fetchQuery);
    return querySnapshot.docs[0].data();
  }


  async updateOne(table: string, where: QueryFieldFilterConstraint, data: any) {
    let col = collection(this.firestore, table);
    const fetchQuery = query(
      col, 
      where,
      limit(1),
    );
    const querySnapshot = await getDocs(fetchQuery);
    querySnapshot.forEach((doc) => { updateDoc(doc.ref, data); });
  }


  fetchAll(table: string, order: QueryOrderByConstraint){
    let col = collection(this.firestore, table);
    const sortedQuery = query(
      col,
      order
    );
    const observable = collectionData(sortedQuery);
    return observable;
  }
}
