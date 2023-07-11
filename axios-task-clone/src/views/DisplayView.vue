<template>
  <div>
    <FormDisplay
      @form-data="addFormData"
      @edit-data="updateFormData"
      :formData="selectedFormData"
    />
    <div v-if="formDataSet.length > 0">
      <table class="data-table">
        <tr>
          <th>Name</th>
          <th>Roll Number</th>
          <th>Email</th>
          <th>Gender</th>
          <th>Grade</th>
          <th>Phone Number</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
        <tr v-for="(formData, index) in formDataSet" :key="formData.id">
          <td>{{ formData.name }}</td>
          <td>{{ formData.roll_number }}</td>
          <td>{{ formData.email }}</td>
          <td>{{ formData.gender }}</td>
          <td>{{ $filters.gradeFilter(formData.marks) }}</td>
          <td>{{ formData.phone_number }}</td>
          <td>
            <button @click="editFormData(index)">Update</button>
          </td>
          <td>
            <button @click="deleteFormData(formData)">❌</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import FormDisplay from "../components/FormDisplay.vue";
import axios from "axios";

export default {
  data() {
    return {
      formDataSet: [],
      selectedFormData: null,
      selectedFormIndex: -1,
      base_url: import.meta.env.VITE_API_URL
    };
  },
  mounted() {
    this.fetchFormData();
  },
  updated() {
    this.fetchFormData();
  },
  components: {
    FormDisplay,
  },
  methods: {
    async fetchFormData() {
      try {
        const response = await axios.get(`${this.base_url}`);
        this.formDataSet = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    addFormData(formData) {
      this.formDataSet.push(formData);
    },
    editFormData(index) {
      this.selectedFormIndex = index;
      this.selectedFormData = { ...this.formDataSet[index] };
    },
    async updateFormData(formData) {
      try {
        const response = await axios.put(
          `${this.base_url}/${formData.id}`,
          formData
        );
        this.formDataSet.splice(this.selectedFormIndex, 1, response.data);
        this.selectedFormIndex = -1;
        this.selectedFormData = null;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFormData(formData) {
      var del = confirm("Are you sure that you want to delete the data?");
      if (del == true) {
        try {
          await axios.delete(`http://127.0.0.1:3333/api/form/${formData.id}`);
          const index = this.formDataSet.findIndex(
            (data) => data.id === formData.id
          );
          if (index !== -1) {
            this.formDataSet.splice(index, 1);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style>
.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-family: cursive;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

.data-table td {
  text-align: center;
}
</style>
