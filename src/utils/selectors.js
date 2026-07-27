export const staffSafeSelect = {
  id: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  role: true,
  isActive: true,
  hospitalId: true,
  departmentId: true,
};

export const patientSafeSelect = {

  id: true,
  patientNumber: true,

  firstName: true,
  lastName: true,

  dateOfBirth: true,
  gender: true,

  phone: true,
  email: true,

  address: true,

  bloodGroup: true,
  genotype: true,

  stateOfOrigin: true,
  localGovernmentOfOrigin: true,

  maritalStatus: true,
  numberOfChildren: true,

  nextOfKinName: true,
  nextOfKinRelationship: true,
  nextOfKinAddress: true,
  nextOfKinPhone: true,
  nextOfKinEmail: true,

  photoUrl: true,

  hospitalId: true,

  createdAt: true,
  updatedAt: true
};

export const hospitalSafeSelect = {
  id: true,
  name: true,
  code: true,
  email: true,
  phone: true,
  address: true,
  createdAt: true,
  updatedAt: true
};