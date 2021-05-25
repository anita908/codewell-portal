// Based off of https://github.com/js-cookie/js-cookie

const defaultAttributes = {
  path: '/'
}
const dayInMilliseconds = 864e5

const Cookies = {
  get: key => {
    const cookies = document.cookie ? document.cookie.split('; ') : []
    const jar = {}

    for (let i = 0; i < cookies.length; i++) {
      const parts = cookies[i].split('=')
      const value = decodeURIComponent(parts.slice(1).join('='))

      try {
        jar[parts[0]] = JSON.parse(value)
      } catch {
        jar[parts[0]] = value
      }

      if (parts[0] === key) {
        break
      }
    }

    return key ? jar[key] : jar
  },

  set: (key, value, attributes) => {
    const extendedAttributes = { ...defaultAttributes, ...attributes }

    if (typeof extendedAttributes.expires === 'number') {
      extendedAttributes.expires = new Date(Date.now() + attributes.expires * dayInMilliseconds)
    }

    if (extendedAttributes.expires) {
      extendedAttributes.expires = extendedAttributes.expires.toUTCString()
    }

    const stringifiedAttributes = Object.keys(extendedAttributes).reduce(
      (attributeString, attributeName) => {
        return `${attributeString}; ${attributeName}=${extendedAttributes[attributeName]}`
      },
      ''
    )

    // eslint-disable-next-line no-return-assign
    return (document.cookie = `${key}=${value}${stringifiedAttributes}`)
  },

  remove: key => {
    Cookies.set(key, '', { expires: -1 })
  }
}

export default Cookies
