import { database } from './appwrite';

//* Below we create an object called databaseService containing asynchronous methods to do CRUD.  This database service is generic, not specific to Notes ( a separate service will be used). The severs deals in generic 'Documents' and the Notes service deals in specific Notes.,

const databaseService = {
  //MARK: List Documents using the listDocuments method
  async listDocuments(dbId, colId) {
    // listDocuments is a method being defined here.
    try {
      const response = await database.listDocuments(dbId, colId);
      // listDocuments being called here is part of the SDK
      // return { data: response.documents || [], error: null };
      return response.documents || [];
    } catch (error) {
      console.error('Error fetching documents:', error.message);
      return { error: error.message };
    }
  },
  //MARK: Create Document
  async createDocument(dbId, colId, data, id = null) {
    try {
      return await database.createDocument(dbId, colId, id || undefined, data);
      // CreateDocument being called here is part of the SDK
    } catch (error) {
      console.error('Error creating document', error.message);
      return {
        error: error.message,
      };
    }
  },
  //MARK: Update Document
  async updateDocument(dbId, colId, id, data) {
    try {
      return await database.updateDocument(dbId, colId, id, data);
    } catch (error) {
      console.error('Error updating document', error.message);
      return {
        error: error.message,
      };
    }
  },

  //MARK: Delete Document
  async deleteDocument(dbId, colId, id) {
    try {
      await database.deleteDocument(dbId, colId, id);
      return { success: true };
    } catch (error) {
      console.error('Error deleting document', error.message);
      return {
        error: error.message,
      };
    }
  },
};

export default databaseService;
