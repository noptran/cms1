import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { ElectronServiceFile } from './electron.service';
import PouchdbFind from 'pouchdb-find';
const USER_INFO = 'USER_INFO';
const USER_FORM = 'USER_FORM';
import { isNullOrUndefined } from "util";
import { ElectronService } from 'ngx-electron';

@Injectable()
export class PouchDbService {
    formsDb: any;
    clientsDb: any;
    metadataDb: any;
    clients: any;
    info: any;

    constructor(private electronService: ElectronServiceFile, private electronServiceInstance: ElectronService) {
        // if (electronService.isElectron()) {
            PouchDB.plugin(PouchdbFind);
            PouchDB.plugin(require('pouchdb-size'));
            // creating the databases
            this.createDb();
            // indexing the databases
            this.indexingDb();
            // info of the databases
            this.getInfoDb();
            console.log('Electron environment. Database initialized');
        // }
    }

    createDb() {
        this.formsDb = new PouchDB('mobile-forms');
        this.clientsDb = new PouchDB('clients');
        this.metadataDb = new PouchDB('metadata');
        // this.info = new PouchDB('clientInfo');
    }

    indexingDb() {
        this.clientsDb.createIndex({
            index: { fields: ['lastname'] }
        }).then((result) => console.log('ClientsDB: Create index, result', result))
            .catch((err) => console.log('Create index, error', err));

        this.formsDb.createIndex({
            index: { fields: ['status', 'program'] }
        }).then((result) => console.log('FormsDB: Create index, result', result))
            .catch((err) => console.log('Create index, error', err));
    }

    getInfoDb() {
        this.formsDb.info().then((info) => console.log('formsDb info', info));

        this.clientsDb.info().then((info) => console.log('clientsDb info', info));

        this.metadataDb.info().then((info) => console.log('info', info));
    }

    getFormsDB = () => this.formsDb;

    getClientsDB = () => this.clientsDb;

    getMetaDataDB = () => this.metadataDb;

    // getClientInfoDB = () => this.info;

    searchClient = async (lastName) => {
        console.log(lastName)
        let db = this.clientsDb;
        let clients = await db.find({
            selector: { lastname: lastName }
        });
        console.log('clients in db', clients.docs);
        return clients.docs;
    };

    searchClientById = async (clientId, referralId) => {
        let clients = await this.clientsDb.find({
            selector: {
                clientID: clientId,
                referralid: referralId
            }
        });
        return clients.docs;
    }
    searchMultiClientsByFact = async (factNo, clientID) => {
        let db = this.clientsDb;
        let multiClients = await db.find({
            selector: {
                facts: factNo
            }
        });
        return multiClients.docs.filter(data => {
            return data.clientID !== clientID;
        });
    }

    searchMultiClientsByAllClients = async (lastName) => {
        let db = this.clientsDb;
        let clients = await db.find({
            selector: { lastname: lastName }
        });
        return clients.docs;
    };
    getForms = async () => {
        let doc = [];
        await this.formsDb.allDocs({ include_docs: true }).then((res) => {
            res.rows.map(row => {
                if (!isNullOrUndefined(row.doc.name)) {
                    return doc.push(row.doc);
                }
            });
        });
        return doc;
    };

    getFormsByStatus = async (status) => {
        let forms = await this.formsDb.find({
            selector: { status: status }
        });
        return forms.docs;
    };

    getFormsByProgram = async (program) => {
        let forms = await this.formsDb.find({
            selector: { program: program }
        });
        return forms.docs;
    };

    saveUser = async (userId, firstName, lastName, reintegrationUserRightsForm, behaviorUserRightsForm,
        fosterCareUserRightsForm, familyPreservationUserRightsForm, oklahomaUserRightsForm) => {
        try {
            console.log(userId, firstName, lastName, reintegrationUserRightsForm, behaviorUserRightsForm,
                fosterCareUserRightsForm, familyPreservationUserRightsForm, oklahomaUserRightsForm)
                console.log('USER_INFO', USER_INFO)
            await this.metadataDb.put({
                _id: USER_INFO,
                userId: userId,
                staffName: firstName,
                lastName: lastName,
                UserRightsForm: [
                    { 'reintegrationUserRightsForm': !isNullOrUndefined(reintegrationUserRightsForm) ? reintegrationUserRightsForm : null },
                    { 'behaviorUserRightsForm': !isNullOrUndefined(behaviorUserRightsForm) ? behaviorUserRightsForm : null },
                    { 'fosterCareUserRightsForm': !isNullOrUndefined(fosterCareUserRightsForm) ? fosterCareUserRightsForm : null },
                    { 'familyPreservationUserRightsForm': !isNullOrUndefined(familyPreservationUserRightsForm) ? familyPreservationUserRightsForm : null },
                    { 'oklahomaUserRightsForm': !isNullOrUndefined(oklahomaUserRightsForm) ? oklahomaUserRightsForm : null }
                ]
            });
            console.log('User saved successfully');
            // to check if user is loggedin or not in main.js
            if (this.electronServiceInstance && this.electronServiceInstance.ipcRenderer) {
                console.log('Set IS_LOGGEDIN as true on pouchdb service');
                this.electronServiceInstance.ipcRenderer.send('IS_LOGGEDIN', true);
            }
        } catch (err) {
            console.error('Error in saving user', err);
        }
    }

    saveUserForms = async (userForms) => {
        try {
            await this.metadataDb.put({
                _id: USER_FORM,
                forms: [userForms]
            });
            console.log('User forms saved successfully');
        } catch (err) {
            console.error('Error in saving user forms', err);
        }
    }

    updatePin = async (pin) => {
        let user: any;
        let updateResult: any;
        try {
            user = await this.metadataDb.get(USER_INFO);
        } catch (err) {
            console.log('Error in fetching user', err);
            return;
        }
        user.pin = pin;
        try {
            updateResult = await this.metadataDb.put(user);
            console.log('User updated with pin successfully', updateResult);
        } catch (err) {
            console.error('Error in updating pin', err);
        }
        return updateResult;
    }

    getUser = async () => {
        let user: any;
        try {
            console.log('USER_INFO', USER_INFO)
            user = await this.metadataDb.get(USER_INFO);
        } catch (err) {
            console.log('Error in fetching user', err);
        }
        return user;
    }

    removeUser = async (id) => {
        // to check if user is loggedin or not in main.js
        if (this.electronServiceInstance && this.electronServiceInstance.ipcRenderer) {
            console.log('Set IS_LOGGEDIN as false');
            this.electronServiceInstance.ipcRenderer.send('IS_LOGGEDIN', false);
        }
        
        let user: any;
        try {
            user = await this.metadataDb.get(id);
        } catch (err) {
            console.log('Error in fetching user', err);
            return;
        }
        let removeResult;
        try {
            removeResult = await this.metadataDb.remove(user);
        } catch (err) {
            console.log('Error in removing user', err);
        }
        return removeResult;
    }
}
