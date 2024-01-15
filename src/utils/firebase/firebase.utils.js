import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMXjHi9EZWdvpbeMcbIL3xrIZoxcvVLlc",
  authDomain: "inventory-vax.firebaseapp.com",
  projectId: "inventory-vax",
  storageBucket: "inventory-vax.appspot.com",
  messagingSenderId: "802346225275",
  appId: "1:802346225275:web:92518f1842a743da345cde",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);

export const addEmployee = async (employee, customId) => {
  try {
    const employeesCollection = "users";
    const employeeDocRef = doc(db, employeesCollection, customId);

    const existingDoc = await getDoc(employeeDocRef);

    if (existingDoc.exists()) {
      alert(
        "La cédula ingresada ya está asociada a un empleado previamente registrado"
      );
    }

    await setDoc(employeeDocRef, employee);

    return customId;
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

const getIdByUsername = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0].data();
    return userDoc.idn;
  } else {
    return null;
  }
};

export const signIn = async (username, password) => {
  try {
    const userId = await getIdByUsername(username, "users");

    if (userId) {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const storedPassword = userDoc.data().password;

        if (password === storedPassword) {
          const userAuth = userDoc.data();
          await updateDoc(userDocRef, { isLoggedIn: true });
          console.log("User signed in successfully");
          return userAuth;
        } else {
          alert("La contraseña ingresada no es correcta");
        }
      } else {
        console.log("User document not found");
      }
    } else {
      alert("Usuario ingresado no encontrado");
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export const signOut = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      await updateDoc(userDocRef, { isLoggedIn: false });
      console.log("User signed out successfully");
    } else {
      console.log("User document not found");
    }
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

export const getEmployeesAndDocuments = async () => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);

  const employeeArray = [];

  querySnapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data();
    const role = data.role;

    if (role === 2) {
      employeeArray.push({ id: docSnapshot.id, ...data });
    }
  });

  return employeeArray;
};

export const updateEmployee = async (employeeId, updatedFields) => {
  try {
    const employeesCollection = "users";
    const employeeDocRef = doc(db, employeesCollection, employeeId);

    const existingDoc = await getDoc(employeeDocRef);

    if (!existingDoc.exists()) {
      return;
    }

    const currentEmployeeData = existingDoc.data();
    const newEmployeeData = { ...currentEmployeeData, ...updatedFields };

    await updateDoc(employeeDocRef, newEmployeeData);
    alert("La información ha sido actualizada exitosamente");

    return employeeId;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const employeesCollection = "users";
    const employeeDocRef = doc(db, employeesCollection, employeeId);

    const existingDoc = await getDoc(employeeDocRef);

    if (!existingDoc.exists()) {
      return;
    }

    return await deleteDoc(employeeDocRef);
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};
