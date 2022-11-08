//프로필 사진 숫자 -> 사진으로 바꾸기
export const image_route = (num) => {
  
    if(num === 1){
      return '/img/profile/profile1.png'
    }else if(num === 2){
      return '/img/profile/profile2.png'
    }else if(num === 3){
      return '/img/profile/profile3.png'
    }else if(num === 4){
      return '/img/profile/profile4.png'
    }else if(num === 5){
      return '/img/profile/profile5.png'
    }else if(num === 6){
      return '/img/profile/profile6.png'
    }else if(num === 7){
      return '/img/profile/profile7.png'
    }
}
export const hexcolor = (num) =>{
    if(num === 1){
      return '#c5e0b4'
    }else if(num === 2){
      return '#ffe699'
    }else if(num === 3){
      return '#bdd7ee'
    }else if(num === 4){
      return '#f8cbad'
    }else if(num === 5){
      return '#ffc5cd'
    }else if(num === 6){
      return '#dfc2ec'
    }else if(num === 7){
      return '#adb9ca'
    }
  }

  //userJob(num) : input num return userJob(string)
export const userJob = (num) =>{
  if(num === 1){
    return '중고등학생'
  }else if(num === 2){
    return '대학생'
  }else if(num === 3){
    return '졸업생'
  }else if(num === 4){
    return '교수님'
  }else if(num === 5){
    return '현직 종사자'
  }else if(num === 6){
    return '기타'
  }
}
//userBelong(info) : input info()
export const userBelong = (info) =>{
  if(info){
    return info
  }else{
    return '이메일 인증 바랍니다.'
  }
}