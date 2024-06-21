import { GitData } from "./GitData.js"

export class GitFavorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || [];
  }

  async add(username) {
    if (!username.trim()) {
      throw new Error("Nome de usuário não pode ser vazio");
    }

    const userExists = this.entries.find(entry => entry.login === username);

    if (userExists) {
      throw new Error("Usuário já cadastrado");
    }

    try {
      const user = await GitData.search(username);

      if (user.message === "Not Found") {
        throw new Error("Usuário não encontrado");
      }

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      console.log(error.message);
      throw new Error("Erro ao buscar usuário");
    }
  }

  save() {
    localStorage.setItem('@github-favorites:', JSON.stringify(this.entries));
  }

  delete(user) {
    const filteredEntries = this.entries.filter(entry => entry.login !== user.login);
    this.entries = filteredEntries;
    this.update();
    this.save();
  }

  update() {
    throw new Error('Método "update" não implementado');
  }
}