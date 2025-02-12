import BaseRepository from "./BaseRepository";
import LoginHistory from "../database/models/LoginHistory";

class LoginHistoryRepository extends BaseRepository<LoginHistory> {
  constructor() {
    super(LoginHistory);
  }

  async deactivateSession(loginHistoryId: number): Promise<LoginHistory | null> {
    return this.update(
      loginHistoryId,
      { isActive: false }, // Update fields
    );
  }
}

export default new LoginHistoryRepository();