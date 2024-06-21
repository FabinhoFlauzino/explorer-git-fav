import { GitFavorites } from "./GitFavorite.js"

export class GitFavoritesView extends GitFavorites {
  constructor(root) {
    super(root);
    this.tbody = this.root.querySelector("table tbody");
    this.update();
    this.onadd();
  }

  onadd() {
    const addButton = this.root.querySelector(".search button");
    addButton.onclick = async () => {
      const input = this.root.querySelector(".search input");
      const username = input.value.trim();

      try {
        await this.add(username);
        input.value = "";
        this.showMessage("Usuário adicionado com sucesso", "success");
      } catch (error) {
        this.showMessage(error.message, "error");
      }
    };
  }

  update() {
    this.removeAllTr();

    this.entries.forEach(user => {
      const row = this.createRow();

      row.querySelector('.user-info img').src = `https://github.com/${user.login}.png`;
      row.querySelector('.user-info img').alt = `Imagem de ${user.name}`;
      row.querySelector('.user-info a').href = `https://github.com/${user.login}`;
      row.querySelector('.user-info p').textContent = user.name;
      row.querySelector('.user-info span').textContent = user.login;
      row.querySelector('.repositories').textContent = user.public_repos;
      row.querySelector('.followers').textContent = user.followers;

      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("Deseja mesmo excluir?");
        if (isOk) {
          this.delete(user);
          this.showMessage("Usuário removido com sucesso", "success");
        }
      };

      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="user-info">
        <img src="https://github.com/FabinhoFlauzino.png" alt="Imagem do usuário">
        <a href="https://github.com/FabinhoFlauzino" target="_blank">
          <p>Fabinho Flauzino</p>
          <span>/fabinhoflauzino</span>
        </a>
      </td>
      <td class="repositories">123</td>
      <td class="followers">1234</td>
      <td class="remove"><Button>Remover</Button></td>
    `;
    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach(tr => tr.remove());
  }

  showMessage(message, type) {
    const msgDiv = document.createElement("div");
    msgDiv.className = `message ${type}`;
    msgDiv.textContent = message;

    this.root.append(msgDiv);

    setTimeout(() => {
      msgDiv.remove();
    }, 3000);
  }
}