import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';

@Injectable()
export class FirebaseService {
  constructor() {
    const serviceAccount = require('../../firebase.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  public async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> {
    return admin.auth().verifyIdToken(token);
  }

  public async createAccount(
    emailAddress: string,
    password: string,
    displayName: string,
    phoneNumber: string,
  ): Promise<UserRecord | undefined> {
    try {
      return admin.auth().createUser({
        email: emailAddress,
        emailVerified: false,
        phoneNumber: phoneNumber,
        password: password,
        displayName: displayName,
        disabled: false,
      });
    } catch (error) {
      console.log('Error creating user account', error);
      return;
    }
  }

  public async getUserProfile(uid:string):Promise<UserRecord>{
    return admin.auth().getUser(uid);
  }
}
