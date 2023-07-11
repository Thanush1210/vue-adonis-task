<template>
  <div class="form-container">
    <form class="form-display" @submit.prevent="onSubmit">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" />
      <br />

      <label for="rollNumber">Roll Number:</label>
      <input
        type="text"
        pattern="[A-Za-z0-9]+"
        id="roll-num"
        v-model="rollNumber"
      />

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" />

      <label for="gender">Gender:</label>
      <label for="male">
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          v-model="gender"
          required
        />
        <img
          src="./icon/icons8-male-48.png"
          alt="male"
          @click="gender = 'male'"
        />
      </label>
      <label for="female">
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          v-model="gender"
          required
        />
        <img
          src="./icon/icons8-female-48.png"
          alt="female"
          @click="gender = 'female'"
        />
      </label>

      <label for="marks">Marks:</label>
      <input type="number" id="marks" v-model="marks" />

      <label for="phoneNumber">Phone Number:</label>
      <input type="number" id="phone-number" v-model="phoneNumber" />

      <button type="submit">{{ editMode ? "Update" : "Submit" }}</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import VueToasted from "vue-toasted";

export default {
  data() {
    return {
      name: "",
      rollNumber: "",
      email: "",
      gender: "",
      marks: null,
      phoneNumber: null,
      editMode: false,
      base_url: import.meta.env.VITE_API_URL
    };
  },
  props: {
    formData: {
      type: Object,
      default: null,
    },
  },
  watch: {
    formData: {
      immediate: true,
      handler(value) {
        if (value) {
          this.name = value.name;
          this.rollNumber = value.roll_number;
          this.email = value.email;
          this.gender = value.gender;
          this.marks = value.marks;
          this.phoneNumber = value.phone_number;
          this.editMode = true;
        } else {
          this.reset();
        }
      },
    },
  },
  methods: {
    async onSubmit() {
      if (
        this.name === "" ||
        this.rollNumber === "" ||
        this.email === "" ||
        this.gender === "" ||
        this.phoneNumber === null ||
        this.marks === null
      ) {
        alert("Enter valid details!");
        return;
      } else if (this.marks.toString().length > 3 || this.marks > 100) {
        alert("Enter valid marks! (less than or equal to 100)");
        this.marks = null;
      } else if (this.phoneNumber.toString().length !== 10) {
        alert("Enter valid phone number!");
        this.phoneNumber = null;
      }

      const formData = {
        name: this.name,
        rollNumber: this.rollNumber,
        email: this.email,
        gender: this.gender,
        marks: this.marks,
        phoneNumber: this.phoneNumber,
      };

      try {
        if (this.editMode) {
          await axios.put(
            `${this.base_url}/${this.formData.id}`,
            formData
          );
          this.$emit("edit-data", formData);
        } else {
          const response = await axios.post(
            `${this.base_url}`,
            formData
          );
          this.$emit("form-data", response.data);
          // console.log(this.base_url);
        }
        this.reset();
      } catch (error) {
        console.log(error);
      }
    },
    reset() {
      this.name = "";
      this.rollNumber = "";
      this.email = "";
      this.gender = "";
      this.marks = null;
      this.phoneNumber = null;
      this.editMode = false;
    },
  },
};
</script>

<style>
.form-container {
  max-width: 500px;
  margin: 0 auto;
}

.form-display {
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-display label {
  display: block;
  margin-bottom: 10px;
  font-family: cursive;
}

.form-display input[type="text"],
.form-display input[type="number"],
.form-display input[type="email"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
}

.form-display input[type="radio"],
.form-display input[type="checkbox"] {
  margin-right: 5px;
}

.form-display button[type="submit"] {
  margin-top: 10px;
  padding: 10px 20px;
  border: 1px solid #4caf50;
  border-radius: 4px;
  cursor: pointer;
  color: #4caf50;
  background-color: white;
}

.form-display button[type="submit"]:hover {
  background-color: #45a049;
  color: white;
}
</style>
