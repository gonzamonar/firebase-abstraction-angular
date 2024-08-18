import { Injectable } from '@angular/core';
import { ref, uploadBytes } from "@firebase/storage";
import { Storage, getDownloadURL } from "@angular/fire/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private storage: Storage,
  ) { }

  async uploadFile(blob: File) {
    const storageRef = ref(this.storage, blob.name);
    const uploadTask = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    return downloadUrl;
  }
}
