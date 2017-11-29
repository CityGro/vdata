/* global jest */

const axios = jest.genMockFromModule('axios')

function request () {
  return new Promise((resolve) => resolve({data: true}))
}

axios.request = request

module.exports = axios
