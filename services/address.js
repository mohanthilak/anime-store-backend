const ErrorMessage = "Error at Address Service Layer";

class AddresssService {
  addressRepo;
  userRepo;
  constructor(addressRepo, userRepo) {
    this.addressRepo = addressRepo;
    this.userRepo = userRepo;
  }
  async AddAddress({ uid, address, city, state, phoneNumbers }) {
    try {
      const user = await this.userRepo.GetUserWithId(uid);
      phoneNumbers.push(user.phoneNumber);
      const data = await this.addressRepo.AddUserAddress({
        uid,
        address,
        city,
        state,
        phoneNumbers,
      });
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, error: e };
    }
  }

  async GetUserAddress({ uid }) {
    try {
      const data = await this.addressRepo.GetUserAddress({ uid });
      return data;
    } catch (e) {
      console.log(ErrorMessage, e);
      return { success: false, e };
    }
  }
}

module.exports = { AddresssService };
