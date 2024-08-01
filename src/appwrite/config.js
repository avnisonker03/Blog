import conf from '../conf/conf.js'
import { Client,ID,Databases,Storage,Query} from "appwrite";


export class Service{
 client=new Client();
 databases;
 bucket;

 constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);
    this.databases=new Databases(this.client);
    this.bucket=new Storage(this.client);
    this.updateContentAttribute();
 }

 async uploadContentFile(content) {
    const file = new File([content], "content.txt", { type: "text/plain" });

    try {
        const response = await this.bucket.createFile(
            conf.appwriteBucketId,
            'unique()', // Unique ID for the file
            file
        );
        return response.$id;
    } catch (error) {
        console.error("Error uploading file in Config.js check:", error.response ? error.response.message : error.message);
        throw error;
    }
}

 async updateContentAttribute() {
    try {
      const response = await this.databases.updateStringAttribute(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        'content', // Attribute name
        5000, // New size limit for the string attribute
        false // Whether the attribute is required
      );
      console.log('Content attribute updated:', response);
    } catch (error) {
      console.error('Error updating attribute:', error);
    }
  }

async createPost({title, slug, content, featuredImage, status, userId}) {
    try {
        const formattedSlug = slug.replace(/[^a-zA-Z0-9._-]/g, '').slice(0, 36);
        const randomString = Math.random().toString(36).substring(2, 8); // Generate a random 6-character string
        let uniqueSlug = `${formattedSlug}-${randomString}`;
        uniqueSlug = uniqueSlug.slice(0, 36);
        
        // console.log("Formatted Slug:", formattedSlug);
        // console.log("Unique Slug:", uniqueSlug);

        if (!formattedSlug) {
            throw new Error('Invalid slug after formatting. It must contain valid characters and be non-empty.');
        }

       // console.log("Uploading content...");
        const contentFileId = await this.uploadContentFile(content);
       // console.log("Content uploaded, file ID:", contentFileId);

        if (!contentFileId) {
            throw new Error('Error uploading content file.');
        }

        return await this.databases.createDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            uniqueSlug,
            {
                title,
                content: contentFileId,
                featuredImage,
                status,
                userId,
            }
        );
    } catch (error) {
        console.log("Appwrite service :: createPost :: error", error);
    }
}

async updatePost(slug, { title, contentFileId, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content: contentFileId, // Ensure this is a string representing the file ID
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
    }
  }
  

async deletePost(slug){
    try{
         await this.databases.deleteDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        )
        return true
      }catch(error){
        console.log("Appwrite service :: deletePost :: error",error);
        return false
      }
}

async getPosts(queries=[Query.equal("status","active")]){
    try{
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries,
        )

    }catch(error){
        console.log("Appwrite service :: getPosts :: error",error);
        return false;
    }

}

//file upload service

async uploadFile(file){
    try{
       return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
       )
    }catch(error){
        console.log("Appwrite service :: uploadFile :: error",error);
        return false;
    }
}

async deleteFile(fileId){
   try{
     await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
     )
    return true;
    }catch(error){
    console.log("Appwrite service :: deleteFile :: error",error);
    return false;
   }
}

getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
    )
}

async getFileContent(fileId) {
    try {
        const response = await this.bucket.getFile(fileId);
        const file = await fetch(response.$download);
        const text = await file.text();
        return text;
    } catch (error) {
        console.error("Error fetching file content:", error);
        throw error;
    }
}

async getPost(slug) {
    try {
        // Fetch the post document
        const post = await this.databases.getDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug
        );
        
        // Fetch the actual content file if it exists
        if (post.content) {
            const content = await this.getFileContent(post.content);
            return {
                ...post,
                content // Add the content to the post object
            };
        }

        return post;
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
}

// Method to fetch the content of a file given its ID
async getFileContent(fileId) {
    try {
        // Get the file download URL
        const response = this.bucket.getFileView(conf.appwriteBucketId, fileId);
        // Fetch the file content using the URL
        const file = await fetch(response.href);
        // Get the text content
        const text = await file.text();
        return text;
    } catch (error) {
        console.error("Error fetching file content:", error);
        throw error;
    }
}

async getUser(userId) {
    try {
        const user = await this.account.get(userId);
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}


}

const service=new Service()
export default service