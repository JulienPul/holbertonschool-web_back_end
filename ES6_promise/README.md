# 📘 Cours : Promises, async/await, try/catch en JavaScript

---

## 1. 🔑 Qu’est-ce qu’une **Promise** ?
Une **Promise** est un objet qui représente la valeur éventuelle (future) d’une opération **asynchrone**.  
Elle peut être dans l’un des trois états :
- **pending** → en attente  
- **fulfilled** → résolue avec succès (valeur dispo)  
- **rejected** → rejetée avec une erreur  

👉 C’est une meilleure alternative aux **callbacks** (qui causaient le fameux *callback hell*).

### Exemple :
```js
const promise = new Promise((resolve, reject) => {
  let success = true;

  if (success) {
    resolve("Opération réussie !");
  } else {
    reject("Erreur : opération échouée");
  }
});

promise
  .then(result => console.log(result))   // si resolve()
  .catch(error => console.error(error)); // si reject()
```

---

## 2. 🔧 Méthodes principales des Promises

- **`then()`** : pour traiter la valeur quand la Promise est résolue.  
- **`catch()`** : pour gérer les erreurs.  
- **`finally()`** : toujours exécuté, succès ou erreur (nettoyage, logs…).  

### Exemple avec `.finally()` :
```js
fetch("https://api.github.com/users/octocat")
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("Erreur :", err))
  .finally(() => console.log("Requête terminée"));
```

---

## 3. 🔗 Promises combinées

### `Promise.all([...])`
Attend que **toutes** les Promises soient résolues (ou rejette si une échoue).
```js
Promise.all([
  fetch("https://api.github.com/users/octocat"),
  fetch("https://api.github.com/users/torvalds")
])
  .then(responses => Promise.all(responses.map(r => r.json())))
  .then(users => console.log(users))
  .catch(err => console.error("Erreur :", err));
```

### `Promise.race([...])`
Renvoie le **premier résultat** (résolu ou rejeté).
```js
Promise.race([
  fetch("https://api.github.com/users/octocat"),
  new Promise((_, reject) => setTimeout(() => reject("Timeout"), 1000))
])
  .then(res => console.log("Gagnant :", res))
  .catch(err => console.error(err));
```

### `Promise.any([...])`
Renvoie la **première Promise résolue** (ignore les rejets, sauf si toutes échouent).  

### `Promise.allSettled([...])`
Renvoie un tableau avec l’état et la valeur de **toutes** les Promises (succès ou erreur).

---

## 4. ⚡ `async` et `await`

- Une fonction déclarée avec `async` **retourne toujours une Promise**.  
- Le mot-clé `await` permet d’**attendre la résolution** d’une Promise avant de continuer le code.  
- Ça rend le code **plus lisible** que les chaînes de `.then()`.

### Exemple :
```js
async function getUser() {
  try {
    let response = await fetch("https://api.github.com/users/octocat");
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erreur :", error);
  } finally {
    console.log("Requête terminée");
  }
}

getUser();
```

---

## 5. 🚨 Gestion des erreurs avec `try/catch`

Avec `async/await`, les erreurs se gèrent avec `try/catch` (comme du code synchrone) :

```js
async function division(a, b) {
  try {
    if (b === 0) throw new Error("Division par zéro !");
    return a / b;
  } catch (error) {
    console.error("Erreur :", error.message);
  }
}

division(10, 0);
```

---

## 6. 💡 Résumé des points clés

✅ **Promise** = objet représentant une opération asynchrone.  
✅ **then / catch / finally** = pour gérer succès, erreur et nettoyage.  
✅ **Promise.all / race / any / allSettled** = pour combiner plusieurs Promises.  
✅ **async/await** = rend le code plus lisible, simplifie la gestion des Promises.  
✅ **try/catch** = pour gérer les erreurs dans les fonctions async.  

---

👉 Astuce : toujours utiliser `try/catch` ou `.catch()` pour éviter les **Promise non gérées** (*UnhandledPromiseRejection*).  
