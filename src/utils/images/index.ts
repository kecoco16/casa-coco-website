export const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    }
  }
}

export const forceDownload = (blobUrl: string, filename: string): void => {
  const a = document.createElement('a')
  a.download = filename
  a.href = blobUrl
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export const downloadImage = (url: string, filename: string): Promise<void> => {
  if (!filename) {
    filename = url?.split('\\')?.pop()?.split('/')?.pop() || ''
  }

  return fetch(url, {
    headers: new Headers({
      Origin: location.origin
    }),
    mode: 'cors'
  })
    .then(response => response.blob())
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob)
      forceDownload(blobUrl, filename)
    })
    .catch(e => console.error(e))
}

export const range = (start: number, end: number) => {
  const output = []
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }

  for (let i = start; i < end; i += 1) {
    output.push(i)
  }

  return output
}

const imageUtils = {
  variants,
  forceDownload,
  downloadImage,
  range
}

export default imageUtils
