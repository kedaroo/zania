# Zania Assignment

Hey Team Zania,

This is a frontend-focused assignment. Let me walk you through it.

This is what the app looks like:
<img width="1280" alt="Screenshot 2024-10-04 at 4 54 45 PM" src="https://github.com/user-attachments/assets/e5a66862-b036-4d08-8fe7-f612b4f8197c">

**The app is sprinkled with synthetic delays to show the loaders.**

It’s a web app which contains cards. 

These cards are displayed in a 3 column grid layout. 

User can drag and drop these cards to change their position. 

Every card has a thumbnail attached to it. Clicking on a card, opens up a modal in which the thumbnail image is shown in enlarged view. User can close this modal by either of the following ways:

1. Click cross icon on the modal
2. Click on the overlay outside the modal
3. Press `Esc` 

The handling of modal closing is covered later in the README.

Since, this is a frontend-focused assignment, I have used `msw` library to mock api calls to the server. I have used local-storage as the persistence layer.

When the user opens the app for the first time, the app makes a `GET` request to mock endpoint to get the data to render the cards. The `GET` handler checks if the data exists in local storage. If it does, it sends the data from the local storage, else, it send the default static data.

When user reorders the cards around, a `POST` request is made to the mock endpoint with newly ordered data as a part of the request body. The `POST` handler persists this in local storage. Hence, if user revisits the website again, he/she sees the latest version of the changes that have been saved.

It is important to note that not every reorder action gets saved. Instead, the client saves data every 5 seconds if there are any unsaved changes. And while saving, the client shows a saving indicator in the header and the time passed since the last save action. Details of this mechanism are explained in detail further down.

## Closing image preview on `Esc`

We add a global keydown listener on `window` in the top component of the app. And in this keydown listener, we check for `Esc` key press, as a result of which we control the closing of the modal using the state.

## Saving every 5 seconds

We maintain a few states in the component to achieve these, namely:

1. `hasUnsavedChanges` - (boolean) - gets set to true after reordering. Gets set to false after saving the changes
2. `isSaving` - (boolean) - gets set to true while the changes are being saved. Gets set to false after the changes have been saved. 
3. `lastSavedTime` - (number) - increments every 1000 ms. Resets to 0 after latest changes have been saved.

Along with the above mentioned states, we create 2 `intervals` in `useEffect` hooks such as the following:

1. The `saveData` interval runs every 5000 ms and calls the save action if `hasUnsavedChanges` is true
2. The `lastSavedTime` interval runs every 1000 ms to increment the counter which denotes the time elapsed since last saved.

## API for supporting add, remove, update

The following describes the API endpoints for performing **add**, **remove**, and **update** operations on cards resource.

### 1. **Add Resource**

### Endpoint:

`POST /api/v1/data`

### Description:

This endpoint is used to add a new card.

### Request:

- **Method**: `POST`
- **URL**: `/api/v1/data`
- **Headers**:
    - `Content-Type: application/json`
    - `Authorization: Bearer <token>`
- **Body** (JSON):
    
    ```json
    {
      "title": "Card Title",
      "type": "Card type",
      "thumbnail": "url"
    }
    ```
    

### Response:

- **Status**: `201 Created`
- **Body** (JSON):
    
    ```json
    {
      "id": 123,
      "title": "Card Title",
      "type": "Card type",
      "thumbnail": "url"
      "createdAt": "timestamp"
    }
    ```
    

### 2. **Remove Resource**

### Endpoint:

`DELETE /api/v1/data/:id`

### Description:

This endpoint is used to remove an existing card by its `id`.

### Request:

- **Method**: `DELETE`
- **URL**: `/api/v1/data/{id}`
- **Headers**:
    - `Authorization: Bearer <token>`

### Response:

- **Status**: `200 OK` (if the resource was successfully deleted)
- **Body** (JSON):
    
    ```json
    {
      "message": "Card successfully deleted",
      "id": 123
    }
    
    ```
    
- **Status**: `404 Not Found` (if the resource with the given ID does not exist)
- **Body** (JSON):
    
    ```json
    {
      "error": "Card not found"
    }
    
    ```
    

### 3. **Update Resource**

### Endpoint:

`PUT /api/v1/data/:id`

### Description:

This endpoint is used to update an existing card's information.

### Request:

- **Method**: `PUT`
- **URL**: `/api/v1/data/{id}`
- **Headers**:
    - `Content-Type: application/json`
    - `Authorization: Bearer <token>`
- **Body** (JSON):
    
    ```json
    {
      "title": "Card Title",
      "type": "Card type",
      "thumbnail": "url"
    }
    ```
    

### Response:

- **Status**: `200 OK`
- **Body** (JSON):
    
    ```json
    {
      "id": 123,
      "title": "Updated Card Title",
      "description": "Updated description of the card",
      "thumbnail": "updated url",
      "updatedAt": "timestamp"
    }
    
    ```
    
- **Status**: `404 Not Found` (if the card with the given ID does not exist)
- **Body** (JSON):
    
    ```json
    {
      "error": "card not found"
    }
    ```
    
