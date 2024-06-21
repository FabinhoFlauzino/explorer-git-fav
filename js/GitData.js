export class GitData {
  static async search(username) {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Erro ao buscar dados do usuário no GitHub");
    }
  }
}
