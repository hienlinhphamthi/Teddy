export default class Validator {
  static valEmail(email) {
    var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!regex.test(email.val())) {
      email.css("border", "1px solid red");
      return false;
    } else {
      email.css("border", "1px solid green");
      return true;
    }
  }

  static valPassword(value) {
    if (value.val().length < 6 || value.val().length > 32) {
      value.css("border", "1px solid red");
      return false;
    } else {
      value.css("border", "1px solid green");
      return true;
    }
  }

  static valPhone(phone) {
    var regex = /^([0]{1})([0-9]{9})$/;
    if (!regex.test(phone.val())) {
      phone.css("border", "1px solid red");
      return false;
    } else {
      phone.css("border", "1px solid green");
      return true;
    }
  }

  static valSelect(select) {
    if (select.val() == "") {
      select.css("border", "1px solid red");
      return false;
    }
    select.css("border", "1px solid green");
    return true;
  }

  static valName(name) {
    var regex =
      /^[a-zA-ZĐạtàáâãảạăắẳằặẵâấẩầậẫêasdsadểềếệễẻẽẹèéêìíòóôỏọõồôốổộỗưứừửựữởơợớờợỡđùúýăđĩũơưÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĂĐĨŨƠƯ]+(([',. -][a-zA-ZĐạtàáâãèéêìíòóôõùúýăđĩũơưÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĂĐĨŨƠƯ ])?[a-zA-ZĐạtàáâãèéêìíòóôõùúýăđĩũơưÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝĂĐĨŨƠƯ]*)*$/;

    var nameTrimmed = name.val().toLowerCase().trim();
    if (nameTrimmed.length < 3 || nameTrimmed.length > 99) {
      name.css("border", "1px solid red");
      return false;
    }
    if (!regex.test(nameTrimmed)) {
      name.css("border", "1px solid red");
      return false;
    }
    name.css("border", "1px solid green");
    return true;
  }

  static valUploadFile(input) {
    let file = input.files[0];
    if (file.size > 1024 * 1024 * 2) {
      console.log("BiG Size");
      input.style.border = 'red 1px solid'
      return false;
    }

    let allowedImageTypes = ["image/jpeg", "image/gif", "image/png"];
    if (!allowedImageTypes.includes(file.type)) {
      input.style.border = 'red 1px solid'
      console.log("errr");  
      return false;
    }
    input.style.border = 'red 1px green'
    return true;
  }

  static valNull(value) {
    if (value.val().length < 1 || value.val().length > 255) {
      value.css("border", "1px solid red");
      return false;
    } else {
      value.css("border", "1px solid green");
      return true;
    }
  }

  static valNumber(value) {
    var regex = /^([0-9]+)$/;
    if (!regex.test(value.val())) {
      value.css("border", "1px solid red");
      return false;
    } else {
      value.css("border", "1px solid green");
      return true;
    }
  }
}
