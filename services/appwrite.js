import { Client, Databases } from 'react-native-appwrite';
import { Platform } from 'react-native';

//* uses the environment variables defined in .env
const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  db: process.env.EXPO_PUBLIC_APPWRITE_DB_ID,
  col: {
    notes: process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID,
  },
};

//* configure the client
const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId);


//* Set platform based on client specified in the .env file.
switch (Platform.OS) {
  case 'ios':
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_BUNDLE_ID);
    break;
  case 'android':
    client.setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PACKAGE_NAME);
    break;
}

//* initialize the database
const database = new Databases(client);

export { database, config, client };
