/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  student: async function (req, res) {
    try {
      const { username, email, age } = req.body;

      console.log('Received info:', req.body);

      // Kiểm tra đầu vào
      if (!username || !email || typeof age !== 'number') {
        return res.paramInvalid({
          errorMsg: 'Username, email and age are required. Age must be a number.',
        });
      }

      // Kiểm tra username đã tồn tại chưa
      const existing = await User.findOne({ name: username });
      if (existing) {
        return res.paramInvalid({ errorMsg: 'Username already exists.' });
      }

      // Tạo user mới
      const newUser = await User.create({
        name: username,
        email,
        age,
      }).fetch();

      console.log(' User created:', newUser);

      // Cập nhật user ID = 1 nếu tồn tại
      const found = await User.findOne({ id: 1 });
      if (found) {
        const updated = await User.updateOne({ id: 1 }).set({ age: 25 });
        console.log(' User updated (ID=1):', updated);
      }

      // Transaction: cập nhật tuổi user ID = 1
      await sails.getDatastore().transaction(async (db, proceed) => {
        try {
          const updatedTx = await User.updateOne({ id: 1 })
            .set({ age: 30 })
            .usingConnection(db);
          console.log('User updated in transaction:', updatedTx);
          proceed(); // commit
        } catch (err) {
          console.error(' Transaction failed:', err);
          proceed(err); // rollback
        }
      });

      return res.success({ data: newUser });

    } catch (error) {
      console.error(' Error in UserController:', error);
      return res.serverError(error);
    }
  }
};
