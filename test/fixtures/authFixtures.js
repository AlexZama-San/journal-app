export const initialState = {
    status: 'checking', // 'checking' | 'authenticated' | 'not-authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123',
    email: 'demo@google.com',
    displayName: 'Demo',
    photoURL: 'https://th.bing.com/th/id/OIP.Q3i9MlwoLYZVv9gqRRaDgAHaJO?pid=ImgDet&rs=1',
    errorMessage: null,
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const demoUser ={
    uid: '123',
    email: 'demo@demo.com',
    displayName: 'Demo',
    photoURL: 'https://th.bing.com/th/id/OIP.Q3i9MlwoLYZVv9gqRRaDgAHaJO?pid=ImgDet&rs=1',
    
}