const TKO_FUNCTIONS = [
  { fn: fStyleModalNotification, target: "shadow" },
  { fn: fStyleDocumentTips, target: "shadow" },
  { fn: fStyleFilterableTable, target: "shadow" },
  { fn: fStyleTableListSelector, target: "shadow" },
  { fn: fStyleTableCodeSelector, target: "shadow" },
  { fn: fStyleSortableTable, target: "shadow" },
  // { fn: fStyleSectionHeader, target: "shadow" },
  { fn: fStyleContentToggle, target: "both" },
  { fn: fStyleContentModal, target: "shadow" },
  { fn: fStyleContentModeless, target: "shadow" },
  { fn: fStyleContentOverlay, target: "shadow" },
  { fn: fStyleAnnotations, target: "shadow" },
  { fn: fDivDynamic, target: "shadow" },
  { fn: fStyleDivDropdownSelector, target: "shadow" },
  { fn: fStyleTableDropdownSelector, target: "shadow" },
  { fn: fStyleParamSetDefinition, target: "shadow" },
  { fn: fTabProcs, target: "shadow" },
  { fn: fStyleStoredForm, target: "shadow" },
  { fn: fStyleMailerForm, target: "shadow" },
  { fn: fStyleChecklist, target: "shadow" },
  { fn: fRowHighlight, target: "shadow" },
  { fn: p86_fLoadTabLink, target: "shadow" },
  { fn: fStyleToggleInputs, target: "shadow" },
  { fn: setDivContent, target: "shadow" },
];

function fLoadTKOTheme() {
  baseUrl = "";
  const host = document.querySelector(".custom-article-content");

  TKO_FUNCTIONS.forEach(({ fn, target }) => {
    if (target === "light" || target === "both") fn(document);
    if ((target === "shadow" || target === "both") && host?.shadowRoot) fn(host.shadowRoot);
  });
}

//Pending

// fStyleProcedureChecklist();
// fBuildCustomList();
// fBuildCustomIndex();
// fBuildFlexiTable();
// fBuildCustomTable();
// fBuildTopicIndex();
// fBuildTopicShortcut();

var bProduction = false;

const tkoIcons = {
  filter:
    "data:image/gif;base64,R0lGODlhDAAKAOYAAAAAAP///2JiZICAglBQUUJCQ2BgYVpaW1dXWO3t7s7Oz8LCw7a2t6+vsJ2dnpqam4+PkICAgX1+f2hpaqSlplZXV/n6+ubn5+Tl5dvc3NXW1tLT08/Q0L2+vqipqW5wb+3v7v39/fv7+/r6+u3t7erq6tPT09LS0sTExMDAwL+/v7i4uK6urqurq6ioqKWlpaOjo6Kiop+fn5ycnJubm5qampmZmZOTk46Ojnd3d2RkZFtbW1lZWVVVVVNTU0lJSUZGRjw8PCoqKicnJxoaGhgYGAQEBP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEcALAAAAAAMAAoAAAdcgAwoJgopDRQPODkCPxIcCSIjJBgqNjo9RS0DJyQhFhcrNz5FMUcuHwslIBo0PEUyR7EvEysZHTtEM7G7MBUbLEQ1u8MEKg5Bw8MIHhFAybsHEAZCz7EEBUNGw4EAOw==",
  loading:
    "data:image/gif;base64,R0lGODlhHgAeAOZ/AOTk5Hp6etnZ2c3NzcbFxtHR0b29vfr6+qqpqpmYmdzc3FVXVY2NjcnJyba1tt/e34ODg4qJiubm5vT09Pb39vj5+K6trsHCwfDw8PLz8ujo6ODg4PHy8Z6enqalpvLy8mtsa/T29Orq6u7u7rKxsuzs7Pb59mRmZJWVldbW1qGhoZGRkdTU1Lu6u+zu7HZ2duHi4XBycObo5u7w7urs6szLzOjq6OTm5NjY2G1vbd7g3ry7vNjX2ODe4Lu8u2dpZ8C+wLSztKuqq5+fn9PV08/Qz5eWl/v9+/z9/P3+/fv8+/z//Pr7+vr8+uLi4vn6+fj6+OPj4/z8/OLh4v39/d3d3cfHx/7+/sTDxOfn5+Xl5ePi4+Pk49PT07CvsM/Pz+np6dXW1eTj5N3e3YiIiOLj4nd4d+vr64eHh8fIx19gX5ubm+/v79vc23d3d7CwsH9/f5OUk7+/v8TFxJycnPn8+X5+fvv++6inqKOjo9vb2/7//v3//f////z+/P///yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkIwRUNCRTRCMDU5RDExRTNCNERDQjkxMTkzQzIyN0JGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkIwRUNCRTRDMDU5RDExRTNCNERDQjkxMTkzQzIyN0JGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjBFQ0JFNDkwNTlEMTFFM0I0RENCOTExOTNDMjI3QkYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjBFQ0JFNEEwNTlEMTFFM0I0RENCOTExOTNDMjI3QkYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJCQB/ACwAAAAAHgAeAAAH/4B+goN8fX2DfRkQcUd8iIeDkZF8FAY1kH0cAQyNgn0AGHuSo31gEBEYh3uanI57E2Z2H6KjkX0GLw6qGQERnX0WCwlSjrWDrysQMH17vK19Gj8gIpCkxX59XwF5VImbR3t9CQu6kUvHGIWCfEpDAV2ZvUp9RGoBFLR8SEyCeyUJDkoww7YBTpwKEzYlYYJmwSU/fPZQyKKF2B4NKsigIECBWR8SL+SEiAHh1gIGSPbsYVLiQZUs/LBVqJEAjYowSfqUMNLgwAAiFCCoedAHCQYnCgBMSHKuXyYDKyJYiLKnQp9ChyQ06DNBi4INbJTQkmQIgIUIDIiS7fOhygMRT//2NF3Hp27dPlfCBAlxjVAFMBP29BXUpLDhJkeuDp7kCIljx36OeBFCubIQPFqqSeLzYUqUz6CdZJlsmTJmzZM+bIDBurXow4WZNLFrLImgI7hz47Zrl9mUBhQW8/kbeHGkcGcICLGg4eqkPW0fnHnCZy4hrl8mEyhxRESFJCr9PJnAp2uVKWH7rhTgAIEPGFdKtcDBhw0GP1kedDSKVKmfc3uMYAACQaRg1UoNyDFCEgWkwEcGVWhg20otRcjPHhg40AAHA/WxwXx9MNEFDn5ckUUV5EEkkQQAKOFIeer48QoWc4TQxxMjykjBA1q4uM4+x13TRwotLMOHiCTKeEZPFaFMYkwfbADRgBJJHJkjRE9M4QR1xhDyxAAG2HCIlQIQgoECZ9jWpYwZEFCAmksgGckRAGjRxJrrhMDXOnIOskQFMeEp4zVHplAmY7UEAgAh+QQJCQB/ACwAAAAAHgAeAAAH/4B+goN8fXuDeyEdQkd8g4aDkZJ8FQM4fYJ7EwkeSI5+fSIZh5KSe2wqeKN+mpyerBQrCROkpY8DCWmYrZ2OfXJuFlRLtpF7FBYqNoabvX0lZBEjmLZ7n6B6ay1XvJ59Fm5Y1KzjfBOFgnxKDmsPfc1HfWN2RhWHhUxsh3scDg0ckPrIGGLhAAVOSZR0CMADU58+VVaQGbVnhA8EQVJU6FMIi5EvsVT0qWGm08MzCGL8iKOPFRMBDhC0cHKlDwcvKZjgqFKBDpwsfSoYCHACQgMp5d598SIEy5k9UKw9THImBZUiEU64cTCBY6k9zwgIsaBhnKCHF07kyAPULJ+3cP/7JNnQgMI1RFnWpHi4p69fJYADKzlyr9ieJHuYQFnMGEoDK5AjWyHgwmykPhd+xNjMOQeax5IhU7b8SI5mzps9HxEMuFGSYoKOKG7MGG5cPiN6MLmbroIICnz99o3EZ08GBTW+AJy050OVB2ee8CHGnMKWLzWqZPAzgYmft36enJugpcoUNkru8pECpkuNFC5ATahSIsmEEH6yPACOBIMTBQBM4Acx5vBQQwFZMMGRElzsh8QGAPCRQRUavJZYCQ9Q6B0fFLCgA3CO7IFBFU8p4YQWS/CRRRXnfHeMBACkN2AFS5DCxxNTTCEdE1No8R0FD2gh43dIeEcIcWcogMFYHktI4YQEFp5RxZLEFcPhAwAgMaCTPn6HoxPSwTYIElo8QMuAPHb5HQYKnPGamEtU4IQGnzT55Jt+HAGAFk2ImQ4TT1Bnp5ozGunnd9cswYQYWUzCmyCBAAAh+QQJCQB/ACwAAAAAHgAeAAAH/4B+goN8fXuEFC1YSHyDhoOQkUlMD1p9gnwUDgaMgntsIYeRkXsTF1gUh5kOcp18FRZvqaORfQ87AperBkeNfV8JF1S0kXxPDXIYfbu9exgeeBmio42OWQYFSbuMfVgJBZeY00sVfqJ8VF8GYH2ackd9Nx1vFYdLfU0cqhQsDxTLfvqwAdJASYVNSZA4oKPjUp8+AISoCMVnAo8aBSQ02VMIRwsdT97s2MMjgQ8qDzHsWBHBgj4/fKSA6VIjxYgkfULU4KKkTBYmDoaU6POkRgIyQ1ggmVaoQpQvAxRk4LMxYJ8kGDZQEeCBDAorIQAW25OhyoAvHMIN2vOLDAMHI/8eETPHp8QYJtUg7SlBYsNDPoADIxlMGAnMuTCT7GnCpLFjJlqiSJ5cZkuIvLUGuGXAuXMHAE5giBbtxMllYn00d17d4Yjr1675JJl7CN9jx6M4ZhChhNaeLAlS/A0MGBKfPRQ0VHkQqlafCydAqMjy0PeTEQ+qaKDgZwITmI00NEBSIMIJNw4miD2MYUoVLhnuTahSIskEChUgqBnTp4KBACdA0ABKglSgRRUbsNELH0pw4Q8SGwDQhxwLMIDEQyUIEcMPcYzAUQVbgPEER+ZgUMUZeyjhhBZ7MAHBAmk4ZMsKaEgjCF7VGDPFFE/wwcQUWgSUghoBzFIIE2yohRlgH2cogMEeS0jhhASz9UHHAkGoxRYxmTwAgGFRrihIHxr8AIIGas2FhBYPTGDPj0GOScICCUiB2SjkOKFBNWFS6ckEbgTwJGIwMfHEEoKEGeeYUbAxDWLFJcqEGFk4R0sgACH5BAkJAH8ALAAAAAAeAB4AAAf/gH6Cg358fIN8TCkChH57h42RfkdsH5CJXTyEfBMVkJKCS08bTgeHmIyCiQ01UJ+ge2wKJXt+S0xdOIN9GzspSaCbSmIPFIa4uo4hWHMUtZKvfBlVYMe5gns8OzB9iK9MhYNJWQ8Te8h3fSNANUyQfUrGhRVbYE+PhRQPAEhK10lfDIjotqdPiQsGPPmpoKXKFDZHavEpoWCGkgIp9gDYUSBJwQlfvAjBYq4QEgxOFADIwGfPEwAYjozAoGSAHA59muhxgGDHlHChXJZ4UEUDhSVHDvXZk2SCiCRaDCAgkaJCn1eq9lDIUuVBCKx8+lRBYKEGTqyNDGUAo0TSHgxW/8D0uWqoLpK7eJEUAgaqbpO/gP9qiUK4cBknX0H10eNBiOPHCBwAcAKjcmUniNEK6iOg8WPHkY+IHi2aD19ojpowCbw60qMMItq6PuPlwdy6dTdp1dCVwlJCc4tEYOCgxG/XT0YQNQrFCoaw3UqwQMKYDAoCIa4i8oNhShUuGZb0IbCgA5UBYZ50sKOlz5MBCcgMCYPkGcMqGyCGnWBGTQoKMUDQxwABeIDEXBj4sEIEQnDwCD324NMHCeX1kUEADCShRAcBdNHNXFoIkUcIz7jzjgQ/gCAXBwFEcEQfOsCBgjO2wJPBM0AV0scaCwQx14UMJNWHF25g0U1WioWhRksAzuwBpJAlkEGGccFgMwEECzRAEIsuKnXBCxYgsUSVe5QBQoaHOIlhUo5QEIcRN1bpRx9gyLXZk++AEaeccx45ZwYQrMDmZn4SEggAIfkECQkAfwAsAAAAAB4AHgAAB/+AfoKDfnx8g0tSAFmEhYeNkH5HbB+PiU5ahHwVTJGNS08bTgeHS0xTmYNIABJNnoR7bAole36mqIN8smdJr7lKYg8UfLepphtTpJ6PgnwZVWDEUk4SvXtnChi1gkvMfp3MSVkPE3tKuHwUD1pKj3tIFUuFFVtgT3uH6Q8ASEiYfkkkVClXaM8EPTiYHKqgpcoUNkdq8SmhgA2VDQD2cKiiIQmfPhWcfKmhp0I+JBicKACQgc+eJwAw+MkwwY+EDRX6HAHTpUaYEYUQvSzxgCOFJUcO4fPzpCYGHAMKZGHSJ5JLClmqPAjhrVCfMzUGbKCwdNCes2j7GASjxKo6Dmf/DcnlA6Wu3bpMkLzi0+uIkr+AjwSIQbhwDBAsqkbqIwGLlceQrXwZbJgwCCKKIfXJ4jiyFQID7tqts8fjsiR7/AL+2wRt2j1pOmTYBgsDAQ19+sw1RCi3AiM/cqRQC6vPAwQWanzQDWlPnxJ4cvyIo4dJgZa5k2B4cEWLAQRBUuRk1oeCjwAnIDRA0qeAGxJUBDxg4qDDmT5N9DhA0GJK0D0boHGCGQ5MkBsFccChQwUrDNGHAGvsgFofExTxhhBYlLOHDHYMIUFufvRxgRtBUJiAB34g4cAaY1TlXAkXGGCSH3uM4JwgfdBABhkjmOgBexIM4QUU2/ShxATkPfKRXQVuYKHWBCci8REWCRSQmUueGGeHERWcBeWPLmHggQcYZLYMBWsEkBiNX0oZYhEJXECFLzRqEIEHvBkUZT5QWPAGWXTWyMY2eoIpSI0E0RliZnuE0IEQbuJIGyGBAAAh+QQJCQB/ACwAAAAAHgAeAAAH/4B+goN7fX2DS1IAWYOCfHyNkYN8IRYGh36JTlqNfBVMkpJ9AGogJYdLTFOcg0gAEk2hkX0WC3moqqx+fGwKZ0myjX0cL2ptfamrgqkbUweQoX3Qfn1YCwxUfExOEsB7ZwoYe41LhCWFgntKaAsNfbm7FA9aStB8SKB+e1kBQxKG1HioCTDhirIkEqpMGMdnD4UsWqQ0nELmhBsHE/oU6rBAyJUNAPZwqKIhSUMmJR5UyZKvDwUDAU5AaCClD78dVCZM8CNhQ4U+SDA4UQBgQpJy6fqUQBDjR5w2fCgc2gPpyc4JWhRsYKNknKg+VRL8yBEG06Q9H6o8EPFkD1JHj/8eFdrToAMHr50qgFk4bRCTv4CZNOljMtgjP0gSJ/ZzxAiDx5AZRKhiNhKfD1OiaN7sJAuKyJAjKKjcCO0GGKhTdw4MuAmkvp2OHplNe3bcuBqJBAkBO94DcXijjbIQgcEGaZ36iBjwZQMFqpIKYfCxIoIFLlKqhEhiKMkEEUnY4KhRQAKTyn0q1EhARkUYJGATYEkSJYuSLwYw9DkChkWNFCPsok8WKpCBghVSpWeBP0yQ0MIeEvhQwBV8pLdFEQMoUEESe5SwhgNnaERNAQkQ4JIDBvhxBX42HNLQBALwwAQkIlUoSB8YeOABBycacEQfI8hRw4zpHFHBNNDt0sdaBQkUIA0FKB7REA8tHDdJbzdmMcQbTzwCpY8vYoHFc8E4UkEQa+jg4pdSUrPBDikAU+YeI3jgw2FRRfkaEw3UAAWWpXFwlyNs2jOBCYBGsgdeUbVwQZvpYBkIADs=",
  close:
    "data:image/gif;base64,R0lGODlhDAAOAOYAAKenp/X19eLi4u3t7Z2dnZaWluXl5dvb29/f39LS0s7OztXV1bS0tO7u7oiIiPT09MjIyL+/v+vr66ampqSoro2NjTVgojRgodra2jFdoIqKin6HlZSUlJqov2mHtcPDw4WJj5mZmd7e3pqepJ+fn4GLmuDg4IOIkZymtDxmpKmxvYGJlVV3qtzc3Kess/Pz86Ojo9HR0W+Fp8/Pz+jo6OHh4enp6Z+swDZiotfX14WJkHeQtk1zq05zrDdiommHtG+IrsrKyoeHh4uXqnCMtY+Pj9jY2JGUmZakuW6KtLi+xtbW1oyMjJ2pvO/v7+bm5jxlo8nJyZypvKysrIaLk6Wvvpubm5ycnHOKq7q/xoyVooeQnbOzs0Jrp8bGxsDAwP///y9cnwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTFCNTY2OUU0MjFFMTFFMzk0NEVDRDBBRUMxNjU1MTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTFCNTY2OUY0MjFFMTFFMzk0NEVDRDBBRUMxNjU1MTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMUI1NjY5QzQyMUUxMUUzOTQ0RUNEMEFFQzE2NTUxOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMUI1NjY5RDQyMUUxMUUzOTQ0RUNEMEFFQzE2NTUxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSknJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAAAMAA4AAAeRgGGCg4SFhoY/HUpZN0QXg11SMwI0NgYLVTxhGU0JJggCAgg1GCo+Hl85Bg0HBwNPRhA7SB8KD2ANA2ABCkEoLl8QMQFguwlRXhQjUxEREsUSX18MR0MVMC1gDy9gIgAFK0lCIQtODFwDSwQaWBZaDgQAExMAJEVUKWE9Ww4cVlcFmJxgMQgHkBI6QGyQAUVQIAA7",
  search:
    "data:image/gif;base64,R0lGODlhDQANAOYAADan1Pv7+zhlqz1wtjmUzTl8wDmExTmMyfr6+jlttPz8/MnW55/K5MnU5XaZymG53KGswWas11ml1Ozs7zNXmaWwxMfQ4UuWzaHD4SI6aGB2ofL190h/wNTf7WaBskJsr+3y9oGOqKbN5pKu1G25z4e02uXu8StJglym1UFzt1lrjUB6vZnH1Tl1u3KWyT1fnsXN27vO5eXq8Fqe0Ze53JKqz4Os1nO7z+Tr8pLG1D1orZSZoaPB31N6tvb3+H+u2DVSiH6p1VW02lOh0zx3vJ7B4KfK5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEcALAAAAAANAA0AAAdugEeCgzkkNyyDiUdCAI0AD4pHEgQoIgxDBBGJRgczPgoBIBcHiT8GGAoyEwElBkWDNgU0ASYbAUEFPIMxLRw4CAgdK0SJCwMJKQ4uxyODDR8CPQLTOjWDFi8UHoIQFYkwQCcakYMhGSrkiTvpg4EAOw==",
};

// #region fLoadTKOTheme =========================================================================================================

// Added helper function to replace sModalKey
function hashModalKey(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
}

function fStyleModalNotification(root) {
  if (!root) return;

  const todayKey = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const modalContentEl = root.querySelector("div[id^='modal-notification']");
  if (!modalContentEl) return;

  const content = modalContentEl.textContent.trim();
  const sModalKey = `modal${hashModalKey(content)}`;

  // Load modal states from localStorage
  const modalStates = JSON.parse(localStorage.getItem("modalStates") || "{}");
  const lastShown = modalStates[sModalKey];

  if (lastShown !== todayKey) {
    const oModalCanvass = fCreateModalBackground(2);
    fStyleModalLoader(modalContentEl, oModalCanvass);

    modalStates[sModalKey] = todayKey;
    localStorage.setItem("modalStates", JSON.stringify(modalStates));
  }
}

// Helper
function fCreateModalBackground(iActiveButton) {
  // Append modal globally to body
  const oModalBgr = document.createElement("div");
  oModalBgr.id = "modal-bground";
  document.body.appendChild(oModalBgr);

  const oModalWrp = document.createElement("div");
  oModalWrp.id = "modal-wrapper";
  document.body.appendChild(oModalWrp);

  const oModalMsg = document.createElement("span");
  oModalMsg.id = "modal-message";
  oModalWrp.appendChild(oModalMsg);

  const oModalGht = document.createElement("span");
  oModalGht.id = "modal-csghost";
  oModalWrp.appendChild(oModalGht);

  const oModalBtn = document.createElement("div");
  oModalBtn.classList.add("modal-button");
  oModalMsg.appendChild(oModalBtn);

  // Pop-out button
  if (iActiveButton > 1) {
    const btnPopout = document.createElement("span");
    btnPopout.id = "modal-tpopout";
    btnPopout.textContent = "Pop-out";
    btnPopout.addEventListener("click", () => {
      const img = oModalMsg.querySelector("img");
      if (img) window.open(img.src);
    });
    oModalBtn.appendChild(btnPopout);
  }

  // Close button
  if (iActiveButton > 0) {
    const btnClose = document.createElement("span");
    btnClose.id = "modal-tclose";
    btnClose.textContent = "Close";
    btnClose.addEventListener("click", () => {
      oModalWrp.remove();
      oModalBgr.remove();
    });
    oModalBtn.appendChild(btnClose);
  }

  // Top-right close image for iActiveButton == 0
  if (!iActiveButton || iActiveButton === 0) {
    const imgClose = document.createElement("img");
    imgClose.id = "modal-close";
    imgClose.src = "../../graphic/close.png";
    imgClose.addEventListener("click", () => {
      oModalWrp.remove();
      oModalBgr.remove();
    });
    oModalBtn.appendChild(imgClose);
  }

  return oModalMsg;
}

// Helper
function fStyleModalLoader(oModalContent, oModalCanvass) {
  // Clear old content but keep the buttons intact
  Array.from(oModalCanvass.children)
    .filter((c) => !c.classList.contains("modal-button"))
    .forEach((c) => oModalCanvass.removeChild(c));

  if (oModalContent.children.length > 0 && oModalContent.children[0].tagName.toLowerCase() === "img") {
    // If content starts with image
    const img = oModalContent.children[0].cloneNode(true);
    img.removeAttribute("style");
    img.classList.add("tko-modal-image"); // responsive CSS handles sizing
    oModalCanvass.appendChild(img);
  } else {
    // If content is text or other HTML
    const clone = oModalContent.cloneNode(true);
    clone.removeAttribute("id");
    if (clone.classList.contains("ref-target")) clone.classList.add("visible");
    // clone.classList.add("tko-modal-content");
    oModalCanvass.appendChild(clone);

    // Reattach overlay load listeners for all images inside the cloned content
    reattachOverlayLoad(clone);

    const btnPopout = oModalCanvass.querySelector("#modal-tpopout");
    if (btnPopout) btnPopout.remove();
  }

  const wrapper = document.getElementById("modal-wrapper");
  const bground = document.getElementById("modal-bground");

  // Show modal with CSS-driven animation
  wrapper?.classList.add("tko-show");
  bground?.classList.add("tko-show");
  oModalCanvass.classList.add("tko-show");

  return { wrapper, bground };
}

function fStyleDocumentTips(root) {
  if (!root) return;

  // Select elements with class warning, caution, or note that are not styled yet
  const tips = [...root.querySelectorAll(".warning, .caution, .note")].reverse();

  tips.forEach((element) => {
    if (element.dataset.isStyled === "true") return; // idempotent

    const html = element.innerHTML;
    const colonIndex = html.indexOf(":");
    const sTipLabel = colonIndex > -1 ? html.substring(0, colonIndex + 1) : "";
    const sTipText = colonIndex > -1 ? html.substring(colonIndex + 1) : html;

    element.innerHTML = ""; // clear existing content

    // Create label div
    const oTipLabel = document.createElement("div");
    oTipLabel.className = `${element.className}-label`;
    oTipLabel.innerHTML = sTipLabel;
    element.appendChild(oTipLabel);

    // Create text holder div
    const oTipHolder = document.createElement("div");
    oTipHolder.className = `${element.className}-text`;
    element.appendChild(oTipHolder);

    // Add text span
    const oTipText = document.createElement("span");
    oTipText.innerHTML = sTipText;
    oTipHolder.appendChild(oTipText);

    // Mark element as styled
    element.dataset.isStyled = "true";
  });
}

function fStyleFilterableTable(root) {
  if (!root) return;

  const ths = Array.from(root.querySelectorAll('th[class^="filter-header"]')).filter(
    (th) => !th.querySelector('img[src*="ico_filter"]') && !th.dataset.isStyled
  );

  ths.forEach((th) => {
    // Create container span with class for CSS
    const span = document.createElement("span");
    span.className = "tko-filter-container";
    th.appendChild(span);

    // Create input
    const input = document.createElement("input");
    input.type = "text";
    input.title = "Filter";
    input.size = 30;
    span.appendChild(input);

    // Create filter icon
    const img = document.createElement("img");
    img.src = tkoIcons.filter;
    img.title = "Filter";
    span.appendChild(img);

    // Event handler
    const filterRows = () => {
      const search = input.value.toLowerCase();
      const rows = th.closest("table").querySelectorAll("tr");
      rows.forEach((row) => {
        if (row.querySelector("td")) {
          row.style.display = row.textContent.toLowerCase().includes(search) ? "table-row" : "none";
        }
      });
    };

    input.addEventListener("keyup", filterRows);
    input.addEventListener("focusout", filterRows);

    // Mark as styled
    th.dataset.isStyled = "true";
  });
}

// function fStyleSectionHeader(root) {
//   if (!root) return;

//   const headers = root.querySelectorAll("h2");
//   headers.forEach((h2) => {
//     const prev = h2.previousElementSibling;
//     if (!prev || !prev.classList.contains("section-padding")) {
//       const div = document.createElement("div");
//       div.className = "section-padding";
//       h2.parentNode.insertBefore(div, h2);
//     }
//   });
// }

function fStyleSortableTable(root) {
  if (!root) return;

  const tables = Array.from(root.querySelectorAll("table")).filter(
    (table) => table.querySelector("th[class^='sort-header']") && !table.hasAttribute("data-flagged")
  );

  tables.forEach((table) => {
    table.setAttribute("data-flagged", "true");

    const headers = Array.from(table.querySelectorAll("th[class^='sort-header']"));

    headers.forEach((th) => {
      th.addEventListener("click", () => {
        const columnIndex = th.cellIndex;

        // Toggle this header's class, reset others
        headers.forEach((h) => {
          if (h !== th && h.className.startsWith("sort-header")) {
            h.className = "sort-header";
          }
        });
        th.className = th.className === "sort-header-desc" ? "sort-header-asc" : "sort-header-desc";

        const type = th.getAttribute("data-type") || "text";

        // Collect all rows with <td>
        const rows = Array.from(table.querySelectorAll("tr")).filter((tr) => tr.querySelector("td"));

        // Build sortable values EXACTLY like old jQuery version
        const sortable = rows.map((row, index) => {
          const cell = row.children[columnIndex];
          let sValue;

          if (type === "date") {
            const date = new Date(cell.textContent);
            let utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
            utc = utc.toString();

            // pad to 15 characters
            while (utc.length < 15) utc = "0" + utc;

            sValue = utc;
          } else {
            sValue = cell.textContent.trim();
          }

          // EXACT old jQuery behavior
          const combined = sValue + " oRowIndex:" + index;

          return {
            combined,
            index,
          };
        });

        // Sort EXACTLY like jQuery: pure ASCII string sort
        sortable.sort((a, b) => (a.combined > b.combined ? 1 : a.combined < b.combined ? -1 : 0));

        if (th.className === "sort-header-desc") sortable.reverse();

        // reorder DOM
        const originalRows = rows.map((r) => r); // preserve row references
        rows.forEach((r) => r.remove());

        sortable.forEach((item) => {
          table.appendChild(originalRows[item.index]);
        });

        // stripe rows
        const allRows = Array.from(table.querySelectorAll("tr"));
        allRows.forEach((tr, i) => {
          tr.classList.toggle("tr-even", i % 2 === 0);
          tr.classList.toggle("tr-odd", i % 2 === 1);
        });
      });
    });

    // Auto-sort by the first header (same as jQuery)
    if (headers[0]) headers[0].click();
  });
}

function fStyleTableCodeSelector(root) {
  if (!root) return;

  const tableDefinitions = root.querySelectorAll("#tab-definition, .tab-definition");

  tableDefinitions.forEach((tableDefinition) => {
    // Direct child DIVs only
    const directDivs = Array.from(tableDefinition.children).filter((child) => child.tagName === "DIV");

    directDivs.forEach((div) => {
      // Find table only inside this div (not nested further)
      const table = div.querySelector("table");

      if (!table || table.dataset.isStyled === "true") return;

      table.dataset.isStyled = "true"; // mark as processed
      div.style.display = "none"; // hide div

      const firstCell = table.querySelector("td");
      if (!firstCell) return;

      // Create button
      const button = document.createElement("input");
      button.type = "button";
      button.value = firstCell.textContent;
      button.classList.add("selector-part-button");

      // Toggle visibility only for this div
      button.addEventListener("mouseup", () => {
        const currentlyHidden = div.style.display === "none";

        // Hide all the direct child divs first
        directDivs.forEach((d) => (d.style.display = "none"));

        // Toggle only this one
        div.style.display = currentlyHidden ? "block" : "none";
      });

      // Insert button before the first direct child div
      const firstDiv = tableDefinition.querySelector("div");
      if (firstDiv) {
        tableDefinition.insertBefore(button, firstDiv);
      } else {
        tableDefinition.appendChild(button);
      }
    });
  });
}

function fStyleTableListSelector(root) {
  if (!root) return;

  const tableSets = root.querySelectorAll("#tab-dynamic, .tab-dynamic");

  tableSets.forEach((set) => {
    if (set.dataset.isStyled === "true") return;
    set.dataset.isStyled = "true";

    // Get only the direct <div> children of .tab-dynamic that have a <table.data>
    const tableParents = Array.from(set.children).filter((child) => child.querySelector(":scope > table.data"));

    // Hide them by default
    tableParents.forEach((p) => (p.style.display = "none"));

    // Create selector UI container
    const selectorHolder = document.createElement("div");
    selectorHolder.classList.add("selector-table-holder");

    const label = document.createElement("div");
    label.classList.add("selector-table-label");
    label.textContent = "Select Table to Display:";
    selectorHolder.appendChild(label);

    set.prepend(selectorHolder);

    // Extract the <table> elements from the direct children only
    const tables = tableParents.map((p) => p.querySelector(":scope > table"));
    tables.forEach((table, index) => {
      if (!table) return;

      const tableParent = table.parentElement;
      const titleCell = table.querySelector("th.head");
      if (!tableParent || !titleCell) return;

      const option = document.createElement("div");
      option.classList.add("selector-table-option");
      option.textContent = titleCell.textContent.trim();

      option.addEventListener("click", () => {
        // Deselect others
        selectorHolder.querySelectorAll(".selector-table-option").forEach((opt) => opt.classList.remove("selector-table-option-selected"));

        option.classList.add("selector-table-option-selected");

        // Show only the selected one
        tableParents.forEach((p, idx) => {
          p.style.display = idx === index ? "block" : "none";
        });
      });

      selectorHolder.appendChild(option);

      // Auto-select first table
      if (index === 0) option.click();
    });
  });
}

function fStyleContentModal(root) {
  if (!root) return;

  root.querySelectorAll(".ref-modal").forEach((modal) => {
    if (modal.dataset.isStyled) return; // skip if already processed

    modal.dataset.isStyled = "true"; // mark as processed
    modal.addEventListener("click", () => {
      let found = false;
      const oModalCanvass = fCreateModalBackground(2);

      root.querySelectorAll(".ref-modal, .ref-target").forEach((ref) => {
        if (found && ref.classList.contains("ref-target")) {
          fStyleModalLoader(ref, oModalCanvass);
          found = false;
        }
        if (ref === modal) found = true;
      });
    });
  });
}

function fStyleContentModeless(root) {
  if (!root) return;

  root.querySelectorAll(".ref-modeless").forEach((modeless) => {
    if (modeless.dataset.isStyled) return; // skip if already processed
    modeless.dataset.isStyled = "true"; // mark as processed

    modeless.addEventListener("click", () => {
      let found = false;
      const oModelessCanvass = fCreateModalBackground(2);
      root.querySelectorAll(".ref-modeless, .ref-target").forEach((ref) => {
        if (found && ref.classList.contains("ref-target")) {
          fStyleModalLoader(ref, oModelessCanvass);
          found = false;
        }
        if (ref === modeless) found = true;
      });
    });
  });
}

function fStyleContentOverlay(root) {
  if (!root) return;

  root.querySelectorAll(".ref-overlay").forEach((overlay) => {
    if (overlay.dataset.isStyled) return; // skip if already processed
    overlay.dataset.isStyled = "true"; // mark as processed

    overlay.addEventListener("click", () => {
      let found = false;
      const oOverlayCanvass = fCreateModalBackground(1);
      root.querySelectorAll(".ref-overlay, .ref-target").forEach((ref) => {
        if (found && ref.classList.contains("ref-target")) {
          fStyleOverlayLoader(ref, oOverlayCanvass);
          found = false;
        }
        if (ref === overlay) found = true;
      });
    });
  });
}

function fStyleContentToggle(root) {
  if (!root) return;

  root.querySelectorAll(".ref-dynamic").forEach((dynamic) => {
    // Skip if already wired
    if (dynamic.dataset.toggleAttached === "true") return;
    dynamic.dataset.toggleAttached = "true";

    dynamic.addEventListener("click", () => {
      let found = false;
      root.querySelectorAll(".ref-dynamic, .ref-target").forEach((ref) => {
        if (found && ref.classList.contains("ref-target")) {
          ref.classList.toggle("visible");
          found = false;
        }
        if (ref === dynamic) {
          found = true;
        }
      });
    });
  });
}

// Reusable load handler for overlay images
function handleOverlayLoad(img) {
  const layClass = img.getAttribute("class") || "";
  const dashIndex = layClass.indexOf("-");
  const underscoreIndex = layClass.indexOf("_");
  if (dashIndex === -1 || underscoreIndex === -1) return;

  const xpos = parseInt(layClass.substring(dashIndex + 1, underscoreIndex), 10);
  const ypos = parseInt(layClass.substring(underscoreIndex + 1), 10);

  // Get the real width/height from the image with class 'imgLayBrd'
  const imgLayBrd = img.closest("div").querySelector(".imgLayBrd");
  if (!imgLayBrd) return;

  if (!imgLayBrd.complete || imgLayBrd.naturalWidth === 0) {
    imgLayBrd.addEventListener(
      "load",
      () => {
        requestAnimationFrame(() => handleOverlayLoad(img));
      },
      { once: true }
    );
    return;
  }

  const wImgBrd = imgLayBrd.naturalWidth;
  const hImgBrd = imgLayBrd.naturalHeight;

  if (!wImgBrd || !hImgBrd) return;

  imgLayBrd.style.maxWidth = "100%";
  imgLayBrd.style.height = "auto";
  imgLayBrd.style.maxHeight = "500px";

  img.style.maxWidth = "100%";
  img.style.height = "auto";
  img.style.position = "absolute";
  img.style.top = `${(100 * xpos) / hImgBrd}%`;
  img.style.left = `${(100 * ypos) / wImgBrd}%`;

  const container = img.closest("div");
  if (container) {
    container.style.position = "relative";
    container.style.maxWidth = "600px";
  }

  const refTarget = img.closest(".ref-target");
  if (refTarget) {
    refTarget.style.position = "relative";
    refTarget.style.maxWidth = `${wImgBrd}px`;
  }

  const modalMessage = img.closest("#modal-message");
  if (modalMessage) {
    modalMessage.style.minWidth = "300px";
    // modalMessage.style.width = "auto";
    // modalMessage.style.paddingTop = "0px";
    // modalMessage.style.paddingBottom = "0px";
  }
}

// Utility: reattach overlay load for cloned content (like in modals)
function reattachOverlayLoad(clonedContent) {
  const layImgs = clonedContent.querySelectorAll("img[class^='lay']");

  layImgs.forEach((img) => {
    const runOnce = () => {
      if (!img.__overlayHandled) {
        img.__overlayHandled = true; // custom flag
        requestAnimationFrame(() => handleOverlayLoad(img));
      }
    };

    // Case 1: future load
    img.addEventListener("load", runOnce, { once: true });

    // Case 2: cached or already loaded
    if (img.complete && img.naturalWidth !== 0) {
      runOnce();
    } else {
      // Case 3: race condition → re-check on next frame
      requestAnimationFrame(() => {
        if (img.complete && img.naturalWidth !== 0) {
          runOnce();
        }
      });
    }
  });
}

function fImgOverLay() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;

  const cImgLay = root.querySelectorAll("[class^=lay]");

  root.querySelectorAll(".ref-modal").forEach((modal) => {
    const hasOverlay = modal.parentElement?.querySelector(".ref-target [class^=lay]");
    if (!hasOverlay) return;

    // derive color from overlay image src
    const laySrcEl = modal.nextElementSibling?.querySelector("img[class^=lay]");
    const laySrcCode = laySrcEl?.dataset?.layCode;

    if (laySrcCode) {
      // only apply styles if layCode exists
      modal.style.backgroundImage = "none";
      modal.style.padding = "0px 5px";
      modal.style.paddingTop = "5px";
      modal.style.fontWeight = "bold";
      modal.style.border = "none";
      modal.style.margin = "0px auto";

      const layClrMap = {
        BL: "#0000ee",
        LK: "#000000",
        GR: "#336633",
        GY: "#000000",
        OR: "#ff8c00",
        RD: "#ee0000",
        WH: "#888888",
        YL: "#ffff00",
      };

      if (layClrMap[laySrcCode]) {
        modal.style.backgroundColor = layClrMap[laySrcCode];
        modal.style.color = layClrMap[laySrcCode] === "#ffff00" ? "#000000" : "#ffffff";
      }

      const tdParent = modal.closest("td");
      if (tdParent) tdParent.setAttribute("align", "center");
    }
  });

  // Clone #lay-board for each overlay container
  const layBoard = root.querySelector("#lay-board");
  if (layBoard) {
    cImgLay.forEach((img) => {
      const container = img.closest("div");
      if (container && !container.querySelector(".imgLayBrd")) {
        const imgDiv = layBoard.cloneNode(true);
        imgDiv.classList.add("imgLayBrd");
        imgDiv.removeAttribute("id");
        container.prepend(imgDiv);
      }
    });
  }

  // Attach load listener to all overlay images
  cImgLay.forEach((img) => {
    img.addEventListener("load", () => handleOverlayLoad(img));
  });
}

function fStyleConditionalEl(el, val, root = document) {
  const name = el.name?.toLowerCase() || "";
  if (!name.includes("conditional")) return;

  let options = [];

  if (el.type === "select-one") {
    options = Array.from(el.querySelectorAll("option"));
  } else {
    options = Array.from(root.querySelectorAll(`[name$="${el.name}"]`));
  }

  options.forEach((opt) => {
    const target = root.querySelector(`#conditional-${opt.value}`);
    if (target) target.style.display = "none";
  });

  const active = root.querySelector(`#conditional-${val}`);
  if (active) {
    if (active.tagName.toLowerCase() === "tr") {
      active.style.display = "table-row";
    } else {
      active.style.display = "block";
    }
  }
}

function fStyleStoredForm(root) {
  if (!root) return;

  // --- Get or initialize stored_form object ---
  const loadStoredData = () => {
    try {
      return JSON.parse(localStorage.getItem("stored_form")) || {};
    } catch {
      return {};
    }
  };

  const saveStoredData = (data) => {
    localStorage.setItem("stored_form", JSON.stringify(data));
  };

  const storedData = loadStoredData();

  const storedForms = root.querySelectorAll('div[class="stored-form"]');

  storedForms.forEach((form) => {
    let retrievedData = false;

    const getBackground = (el) => window.getComputedStyle(el).backgroundColor;

    // --- Input[text|file|textarea] handling ---
    form.querySelectorAll('input[type="text"], input[type="file"], textarea').forEach((input) => {
      const name = input.name;
      if (!name) return;

      if (storedData[name] !== undefined) {
        retrievedData = true;
        input.dataset.defaultBground = getBackground(input);
        input.style.background = "pink";
        input.value = storedData[name];
      }

      input.addEventListener("keyup", () => {
        storedData[name] = input.value;
        saveStoredData(storedData);
        input.style.background = input.dataset.defaultBground || "";
      });
    });

    // --- Select handling ---
    form.querySelectorAll("select").forEach((select) => {
      const name = select.name;
      if (!name) return;

      if (storedData[name] !== undefined && storedData[name] !== "") {
        retrievedData = true;
        select.dataset.defaultBground = getBackground(select);
        select.value = storedData[name];
        select.style.background = "pink";
        fStyleConditionalEl(select, storedData[name], root);
      }

      select.addEventListener("change", () => {
        storedData[name] = select.value;
        saveStoredData(storedData);
        select.style.background = select.dataset.defaultBground || "";
        fStyleConditionalEl(select, select.value, root);
      });
    });

    // --- Radio handling ---
    const radios = form.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      const name = radio.name;
      if (!name) return;

      if (storedData[name] !== undefined && storedData[name] === radio.value) {
        retrievedData = true;
        radio.checked = true;
        radio.style.background = "pink";
        fStyleConditionalEl(radio, storedData[name], root);
      }

      radio.addEventListener("click", () => {
        form.querySelectorAll(`input[name="${name}"]`).forEach((r) => {
          r.style.background = "";
        });
        const checked = form.querySelector(`input[name="${name}"]:checked`);
        if (checked) {
          storedData[name] = checked.value;
          saveStoredData(storedData);
          fStyleConditionalEl(radio, checked.value, root);
        }
      });
    });

    // --- Toggle radio handling ---
    const toggleRadios = form.querySelectorAll('input[type="radio"][name$="-toggle"]');
    toggleRadios.forEach((radio) => {
      radio.style.opacity = 0;

      const name = radio.name;
      if (storedData[name] !== undefined && storedData[name] === radio.value) {
        const label = form.querySelector(`label[for="${radio.id}"]`);
        if (label) label.classList.add("stored");
      }

      radio.addEventListener("click", () => {
        form.querySelectorAll(`[name="${name}"]`).forEach((r) => {
          const lbl = form.querySelector(`label[for="${r.id}"]`);
          if (lbl) lbl.removeAttribute("class");
        });
        const lblChecked = form.querySelector(`label[for="${radio.id}"]`);
        if (lblChecked) lblChecked.classList.add("checked");
      });
    });

    // --- Add "clear stored data" message ---
    if (retrievedData && !form.querySelector(".stored-info-msg")) {
      const info = document.createElement("span");
      info.classList.add("stored-info-msg");
      info.textContent = "The fields highlighted below contain information saved from your last session. To clear the stored data, ";
      Object.assign(info.style, {
        background: "pink",
        display: "inline-block",
        padding: "5px 10px",
      });

      const clearLink = document.createElement("a");
      clearLink.textContent = "click here.";
      clearLink.href = "javascript:void(0)";

      clearLink.addEventListener("click", () => {
        const confirmErase = confirm("Do you really want to clear all data from this form?");
        if (!confirmErase) return;

        // Remove all keys belonging to this form from stored_form object
        form.querySelectorAll("[name]").forEach((el) => {
          if (el.name && storedData.hasOwnProperty(el.name)) {
            delete storedData[el.name];
          }
        });
        saveStoredData(storedData);

        // Reset all form fields visually
        form.querySelectorAll('input[type="text"], input[type="file"], textarea').forEach((el) => {
          el.value = "";
          el.style.background = "#ffffff";
        });
        form.querySelectorAll("select").forEach((el) => {
          el.value = "";
          el.style.background = "inherit";
        });
        form.querySelectorAll('input[type="radio"]').forEach((el) => {
          el.checked = false;
          el.style.background = "inherit";
        });
        form.querySelectorAll('input[type="radio"][name$="-toggle"]').forEach((el) => {
          const lbl = form.querySelector(`label[for="${el.id}"]`);
          if (lbl) lbl.removeAttribute("class");
        });

        info.remove();
      });

      info.appendChild(clearLink);
      form.prepend(info);
    }
  });
}

// from tko.000.js
function fStyleAnnotations(root) {
  if (!root) return;

  // Select any element with a class containing "annotation"
  root.querySelectorAll("[class*='annotation']").forEach((annotation) => {
    annotation.querySelectorAll("*[id^='annotation-']").forEach((node) => {
      // Skip if we already inserted a span.def
      if (node.querySelector(":scope > .def")) return;

      // Extract the last character of the id
      const noteChar = node.id.slice(-1);

      // Create the span.def element
      const defSpan = document.createElement("span");
      defSpan.className = "def";
      defSpan.textContent = noteChar;

      // Insert it before the existing content (without overwriting innerHTML)
      node.insertBefore(defSpan, node.firstChild);
    });
  });
}

function fDivDynamic(root) {
  if (!root) return;

  root.querySelectorAll(".div-dynamic").forEach((container, i) => {
    // Prevent duplicate quick-box creation
    if (container.previousElementSibling?.classList.contains("quick-box")) {
      return; // already processed
    }

    const divs = Array.from(container.children);

    // Create quick-box before container
    const quickBox = document.createElement("div");
    quickBox.classList.add("quick-box");
    container.parentNode.insertBefore(quickBox, container);

    // Add label
    const label = document.createElement("div");
    label.classList.add("label");
    // Use data-label if present, otherwise default
    label.textContent = container.dataset.label || "Select Content to Display:";
    quickBox.appendChild(label);

    // Add index container
    const indexBox = document.createElement("div");
    indexBox.classList.add("icon-index");
    quickBox.appendChild(indexBox);

    // Create index links
    divs.forEach((div, j) => {
      const title = div.children[0]?.textContent.trim() || `Item ${j + 1}`;
      div.dataset.linkId = `link_${i}_${j}`;

      const link = document.createElement("div");
      link.textContent = title;
      link.classList.add("index-link");
      link.dataset.target = div.dataset.linkId;

      link.addEventListener("click", () => {
        indexBox.querySelectorAll(".selected").forEach((el) => el.classList.remove("selected"));
        divs.forEach((d) => (d.style.display = "none"));
        div.style.display = "block";
        link.classList.add("selected");
      });

      indexBox.appendChild(link);
    });

    // Initial state
    const firstLink = indexBox.querySelector("div");
    if (firstLink) firstLink.classList.add("selected");
    divs.forEach((d, idx) => {
      d.style.display = idx === 0 ? "block" : "none";
    });
  });
}

function fStyleDivDropdownSelector(root) {
  if (!root) return;

  const selectors = root.querySelectorAll(".div-selector");

  selectors.forEach((selector) => {
    // Prevent duplicate dropdown creation (idempotent)
    if (selector.querySelector(".selector-table-label")) {
      return;
    }

    const children = Array.from(selector.children);
    if (children.length === 0) return;

    // Create holder div before first child
    const holder = document.createElement("div");
    selector.insertBefore(holder, children[0]);

    // Label
    const label = document.createElement("span");
    label.textContent = "Select Content to Display:";
    label.classList.add("selector-table-label");
    holder.appendChild(label);

    // Dropdown
    const dropdown = document.createElement("select");
    holder.appendChild(dropdown);

    // Find sections and their parent divs
    const sectionDivs = Array.from(selector.querySelectorAll("div.section")).map((sec) => sec.parentElement);

    // Initially hide all
    sectionDivs.forEach((div) => {
      div.style.display = "none";
    });

    // Populate dropdown options
    sectionDivs.forEach((div, idx) => {
      const heading = div.querySelector("h2, h3");
      // const firstChild = div.firstElementChild;
      // firstChild?.textContent.trim()

      const title = heading?.textContent.trim() || "";

      const option = document.createElement("option");
      option.value = idx;
      option.textContent = title;
      dropdown.appendChild(option);
    });

    // Show first by default
    if (sectionDivs.length > 0) {
      sectionDivs[0].style.display = "block";
    }

    // Change handler
    dropdown.addEventListener("change", (e) => {
      const index = e.target.selectedIndex;
      sectionDivs.forEach((div, i) => {
        div.style.display = i === index ? "block" : "none";
      });
    });
  });

  // Apply the global cleanup styles
  root.querySelectorAll(".div-selector > div").forEach((div) => {
    div.style.marginTop = "0px";
    div.style.marginBottom = "0px";
  });

  root.querySelectorAll(".div-selector h2").forEach((h2) => {
    h2.style.borderTop = "none";
    h2.style.marginTop = "0px";
  });

  root.querySelectorAll("h2").forEach((h2) => {
    if (h2.parentElement) {
      h2.parentElement.style.borderTop = "none";
    }
  });

  // root.querySelectorAll(".section-padding").forEach((el) => {
  //   el.remove();
  // });
}

function fStyleTableDropdownSelector(root) {
  if (!root) return;

  const tableSets = root.querySelectorAll("#tab-selector, .tab-selector");

  tableSets.forEach((tableSet) => {
    // Prevent duplicate dropdown creation (idempotent)
    if (tableSet.querySelector(".selector-table-label")) {
      return;
    }

    const children = Array.from(tableSet.children);
    if (children.length === 0) return;

    // Create holder before first child
    const holder = document.createElement("div");
    tableSet.insertBefore(holder, children[0]);

    // Label
    const label = document.createElement("span");
    label.textContent = "Select Table to Display: ";
    label.classList.add("selector-table-label");
    holder.appendChild(label);

    // Dropdown
    const dropdown = document.createElement("select");
    holder.appendChild(dropdown);

    // Find tables with class=data and their parent divs
    const tableDivs = Array.from(tableSet.querySelectorAll("table.data")).map((tbl) => tbl.parentElement);

    // Hide all by default
    tableDivs.forEach((div) => {
      div.style.display = "none";
    });

    // Populate dropdown options
    tableDivs.forEach((div, idx) => {
      const title = div.querySelector("th.head")?.textContent.trim() || `Table ${idx + 1}`;
      const option = document.createElement("option");
      option.value = idx;
      option.textContent = title;
      dropdown.appendChild(option);
    });

    // Show first table by default
    if (tableDivs.length > 0) {
      tableDivs[0].style.display = "block";
    }

    // Change handler
    dropdown.addEventListener("change", (e) => {
      const index = e.target.selectedIndex;
      tableDivs.forEach((div, i) => {
        div.style.display = i === index ? "block" : "none";
      });
    });
  });
}

function fStyleParamSetDefinition(root) {
  if (!root) return;

  const popups = root.querySelectorAll("#def-popup, .def-popup");

  popups.forEach((popup) => {
    if (popup.dataset.isStyled === "true") return;
    popup.dataset.isStyled = "true";

    const dl = popup.querySelector("dl");
    if (!dl) return;

    const termContainer = document.createElement("div");

    // --- UPDATED LOGIC ---
    if (dl.id && dl.id.trim() !== "") {
      termContainer.id = dl.id + "-container";
    }

    if (!dl.id || dl.id === "paramset-system") {
      termContainer.classList.add("tko-popup-container");
    }

    // ----------------------

    popup.appendChild(termContainer);

    const terms = dl.querySelectorAll("dt");
    terms.forEach((term, i) => {
      const parameterDiv = document.createElement("div");
      parameterDiv.className = "parameter";
      parameterDiv.style.opacity = 0;

      parameterDiv.addEventListener("mouseover", () => {
        parameterDiv.style.opacity = 0.2;

        const def = termContainer.querySelectorAll(".definition")[i];
        if (def) {
          const rect = parameterDiv.getBoundingClientRect();
          const parentRect = termContainer.getBoundingClientRect();
          const iTop = rect.top - parentRect.top + rect.height;

          def.style.top = iTop + "px";
          def.style.display = "block";
        }
      });

      parameterDiv.addEventListener("mouseout", () => {
        parameterDiv.style.opacity = 0;
        const def = termContainer.querySelectorAll(".definition")[i];
        if (def) {
          def.style.display = "none";
        }
      });

      termContainer.appendChild(parameterDiv);
    });

    const definitions = dl.querySelectorAll("dd");
    definitions.forEach((def) => {
      const defDiv = document.createElement("div");
      defDiv.className = "definition";
      defDiv.innerHTML = def.innerHTML;
      defDiv.style.display = "none";
      termContainer.appendChild(defDiv);
    });

    dl.remove();
  });
}

function fStyleMailerForm(root) {
  if (!root) return;

  // Idempotent event helper
  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  const forms = root.querySelectorAll("form[name=mailer-form]");

  forms.forEach((form) => {
    const button = form.querySelector("button[type=submit]");
    if (!button) return;

    addEventOnce(button, "click", (evt) => {
      evt.preventDefault(); // bypass form submit

      // Validate required fields
      let canSubmit = true;
      const requiredFields = Array.from(form.querySelectorAll("[name^=required]:not([type=hidden])")).filter((el) => el.offsetParent !== null);

      for (const field of requiredFields) {
        const val = field.value;
        if ((isNaN(val) && val.length <= 1) || (!isNaN(val) && val == 0)) {
          alert(`Please enter a value in ${field.getAttribute("title")}.`);

          const originalBg = field.style.backgroundColor;
          field.style.background = "yellow";
          field.focus();

          addEventOnce(field, "input", () => {
            field.style.background = originalBg;
          });

          canSubmit = false;
          break;
        }
      }
      if (!canSubmit) return false;

      // Collect all input/textarea/select inside the form
      const fields = form.querySelectorAll("input, textarea, select");
      const formData = {};

      fields.forEach((el) => {
        if (el.offsetParent === null) return; // skip hidden elements
        if (!el.title && !el.name) return;

        const key = el.title || el.name;

        if (el.type === "radio" || el.type === "checkbox") {
          if (el.checked) formData[key] = el.value;
        } else {
          formData[key] = el.value;
        }
      });

      // Build plain text email body, URL-encoded
      const body = Object.entries(formData)
        .map(([key, val]) => `${key}: ${val}`)
        .join("%0D%0A");

      // Load your safe mailto template from data attribute
      let mailto = form.dataset.mailtoTemplate || "";

      // Replace #Placeholders# using title/name keys
      Object.entries(formData).forEach(([key, val]) => {
        const rgx = new RegExp(`#${key}#`, "gi");
        mailto = mailto.replace(rgx, encodeURIComponent(val));
      });

      // Trigger default email client
      window.location.href = `${mailto}&body=${body}`;
    });
  });
}

function fStyleChecklist(root) {
  if (!root) return;

  const storedData = (() => {
    try {
      return JSON.parse(localStorage.getItem("stored_checklist")) || {};
    } catch {
      return {};
    }
  })();

  const saveStoredData = (data) => {
    localStorage.setItem("stored_checklist", JSON.stringify(data));
  };

  const addEventOnce = (el, event, handler) => {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  };

  let bRetrievedData = false;

  // --- Style checklist steps and prepend checkboxes ---
  root.querySelectorAll(".checklist [id^='step']").forEach((step) => {
    step.style.listStyle = "none";
    step.style.marginLeft = "-20px";

    // Avoid adding duplicate checkboxes
    if (!step.querySelector("input[type='checkbox']")) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = step.id;
      checkbox.value = "0";
      checkbox.style.backgroundColor = "white";
      step.prepend(checkbox);
    }
  });

  // --- Handle stored data and events ---
  root.querySelectorAll(".checklist input[type='checkbox']").forEach((checkbox) => {
    const name = checkbox.name;
    if (!name) return;

    // Apply stored data
    if (storedData[name]) {
      bRetrievedData = true;
      checkbox.checked = true;
      checkbox.style.backgroundColor = "pink";
    }

    // Event for checkbox click
    addEventOnce(checkbox, "click", () => {
      checkbox.style.backgroundColor = "white";
      if (checkbox.checked) {
        storedData[name] = 1;
      } else {
        delete storedData[name];
      }
      saveStoredData(storedData);
    });
  });

  // --- Add info message if any data retrieved ---
  if (bRetrievedData && !root.querySelector(".checklist .stored-info-msg")) {
    const info = document.createElement("span");
    info.classList.add("stored-info-msg");
    info.textContent = "The fields highlighted below contain information saved from your last session. To clear the stored data, ";
    Object.assign(info.style, {
      background: "pink",
      display: "inline-block",
      padding: "5px 10px",
    });

    const clearLink = document.createElement("a");
    clearLink.textContent = "click here.";
    clearLink.href = "javascript:void(0)";
    addEventOnce(clearLink, "click", () => {
      const confirmErase = confirm("Do you really want to clear all data from this form?");
      if (!confirmErase) return;

      root.querySelectorAll(".checklist input[type='checkbox']").forEach((checkbox) => {
        checkbox.checked = false;
        checkbox.value = "0";
        checkbox.style.backgroundColor = "white";
        if (checkbox.name && storedData.hasOwnProperty(checkbox.name)) {
          delete storedData[checkbox.name];
        }
      });

      saveStoredData(storedData);
      info.remove();
    });

    info.appendChild(clearLink);
    const checklist = root.querySelector(".checklist");
    if (checklist) checklist.prepend(info);
  }
}

function fRowHighlight(root) {
  if (!root) return;

  const tables = root.querySelectorAll(".row-highlight");
  if (tables.length === 0) return;

  tables.forEach((table) => {
    // Idempotence: initialize only once per table
    const initKey = "data-init-row-highlight";
    if (table.hasAttribute(initKey)) return;
    table.setAttribute(initKey, "1");

    const tds = table.querySelectorAll("td");

    tds.forEach((td) => {
      td.addEventListener("mouseenter", () => {
        const rowCells = td.parentElement.querySelectorAll("td");
        rowCells.forEach((c) => (c.style.backgroundColor = "#dddddd"));
        td.style.cursor = "default";
      });

      td.addEventListener("mouseleave", () => {
        const rowCells = td.parentElement.querySelectorAll("td");
        rowCells.forEach((c) => (c.style.backgroundColor = "#eeeeee"));
      });
    });
  });
}

function fStyleToggleInputs(root) {
  if (!root) return;

  root.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach((input) => {
    if (input.dataset.isStyled) return;
    input.dataset.isStyled = "true";

    const name = input.name;

    // --- Build a unified click handler ---
    const handler = () => {
      requestAnimationFrame(() => {
        if (!name) return;

        // --------------------
        // RADIO BUTTON LOGIC
        // --------------------
        if (input.type === "radio") {
          const group = root.querySelectorAll(`input[name="${name}"]`);

          // Clear group
          group.forEach((r) => {
            r.checked = false;
            r.removeAttribute("checked");
          });

          // Check clicked radio
          input.checked = true;
          input.setAttribute("checked", "");
        }

        // --------------------
        // CHECKBOX LOGIC
        // --------------------
        else if (input.type === "checkbox") {
          const willCheck = !input.checked;

          input.checked = willCheck;

          if (willCheck) input.setAttribute("checked", "");
          else input.removeAttribute("checked");
        }
      });
    };

    // Attach to input
    input.addEventListener("click", handler);

    // Attach to label (if exists)
    const label = root.querySelector(`label[for="${input.id}"]`);
    if (label) {
      label.addEventListener("click", (e) => {
        // Prevent double-fire (label triggers input natively)
        e.preventDefault();
        input.click();
      });
    }
  });
}

// ECV3-17326, ECV3-40147, ECV3-17544
function setDivContent() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;

  const div = root.querySelector("#monitor_password");
  if (!div) return;

  // Idempotent: do not rewrite if already set for this month/year
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const key = `data-pass-${year}-${month}`;

  if (div.hasAttribute(key)) return;

  let value = "";

  if (year === 2025) {
    if (month === 11) value = "684279522";
  } else if (year === 2026) {
    const passwords = {
      0: "415793450",
      1: "370201363",
      2: "828333456",
      3: "596042260",
      4: "617271558",
      5: "021607970",
      6: "707025638",
      7: "018118132",
      8: "464373373",
      9: "268063344",
      10: "219980010",
      11: "769739749",
    };
    value = passwords[month] || "";
  } else if (year > 2026) {
    value = "<strong>Time to Update the Passwords</strong>";
  }

  div.innerHTML = value;
  div.setAttribute(key, "1");
}

// #endregion fLoadTKOTheme =========================================================================================================

// #region a08 =========================================================================================================
function a08_fCreateSenseAdd() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const cells = root.querySelectorAll("#sense_add td");

  cells.forEach((td) => {
    const tdText = td.textContent;

    if (tdText === "") {
      td.style.backgroundColor = "green";
      td.style.color = "white";
      td.textContent = "OFF";
    } else if (tdText === "1") {
      td.style.backgroundColor = "red";
      td.style.color = "white";
      td.textContent = "ON";
    }
  });
}
// #endregion a08 =========================================================================================================

// #region a30 =========================================================================================================
function a30_fLoadPartInfo() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  // Iterate through all table rows
  root.querySelectorAll("tr").forEach((tr) => {
    const tds = tr.querySelectorAll("td");
    const td = tds[1];
    if (!td) return;

    const spans = td.querySelectorAll("span");
    const part = spans[0];
    const partInfo = spans[1];
    if (!part || !partInfo) return;

    part.classList.add("part");
    partInfo.classList.add("part-info");

    const sPartInfo = partInfo.textContent.split(";");
    const sMaker = "<strong>Manufacturer: </strong>" + (sPartInfo[0] || "");
    const sModel = "<strong>Model/Description: </strong>" + (sPartInfo[1] || "");

    partInfo.innerHTML = sModel + "<br/>" + sMaker;
  });

  // Hover behavior for parts
  root.querySelectorAll(".part").forEach((part) => {
    const info = part.parentElement ? part.parentElement.querySelector(".part-info") : null;
    if (!info) return;

    // initial state similar to jQuery hide()
    info.style.display = "none";
    info.style.transition = "opacity 0.1s";
    info.style.opacity = "0";

    part.addEventListener("mouseenter", () => {
      info.style.display = "block";
      requestAnimationFrame(() => {
        info.style.opacity = "1";
      });
    });

    part.addEventListener("mouseleave", () => {
      info.style.opacity = "0";
      setTimeout(() => {
        info.style.display = "none";
      }, 100);
    });
  });
}
// #endregion a30 =========================================================================================================

// #region b00 =========================================================================================================
// eventlister for article ECV3-60953 (new)
function b00_bds40256_submitSurvey() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) {
    console.error("Shadow root not found for .custom-article-content");
    return;
  }

  const root = host.shadowRoot;

  // Access your form container inside the shadow root
  const container = root.querySelector("#custom-article-div");
  if (!container) {
    console.error("#custom-article-div not found inside shadow root");
    return;
  }

  // Collect all input and textarea fields
  const fields = container.querySelectorAll("input, textarea");
  const formData = {};

  fields.forEach((el) => {
    if (el.type === "radio") {
      if (el.checked) formData[el.name] = el.value;
    } else if (el.type !== "button") {
      formData[el.name] = el.value;
    }
  });

  // Build email body
  const body = Object.entries(formData)
    .map(([key, val]) => `${key}: ${val}`)
    .join("%0D%0A"); // newline for mailto body

  const subject = "Alber BDS-40 and BDS-256 Inspection Survey Submission";
  const recipient = "monitoring.support@emerson.com";
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;

  // Trigger default mail client
  window.location.href = mailto;
}

// eventlister for article ECV3-60952 (new)
function b00_bds40_submitSurvey() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) {
    console.error("Shadow root not found for .custom-article-content");
    return;
  }

  const root = host.shadowRoot;

  // Access your form container inside the shadow root
  const container = root.querySelector("#custom-article-div");
  if (!container) {
    console.error("#custom-article-div not found inside shadow root");
    return;
  }

  // Collect all input and textarea fields
  const fields = container.querySelectorAll("input, textarea");
  const formData = {};

  fields.forEach((el) => {
    if (el.type === "radio") {
      if (el.checked) formData[el.name] = el.value;
    } else if (el.type !== "button") {
      formData[el.name] = el.value;
    }
  });

  // Build email body
  const body = Object.entries(formData)
    .map(([key, val]) => `${key}: ${val}`)
    .join("%0D%0A"); // newline for mailto body

  const subject = "BDS-40 Site Survey Submission";
  const recipient = "albersurveys@EmersonNetworkPower.com";
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;

  // Trigger default mail client
  window.location.href = mailto;
}
// #endregion b00 =========================================================================================================

// #region b07 =========================================================================================================
function bo7_quadData1() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const vollEl = root.querySelector("#voll");
  const cellEl = root.querySelector("#cell");
  const tempEl = root.querySelector("#temp");
  const tempUnitEl = root.querySelector("#TempUnit");
  const answer1El = root.querySelector("#answer1");

  // Use only these variables everywhere
  const voll = vollEl.value;
  const cell = cellEl.value;
  const temp = tempEl.value;
  const tempUnit = tempUnitEl.value;

  if (isNaN(cell) || isNaN(temp) || isNaN(voll)) {
    alert("Enter a numerical value.");
  } else if (vollEl.disabled || cellEl.disabled || tempEl.disabled) {
    answer1El.disabled = true;
  } else if (voll == 0 && cell == 0 && temp == 0) {
    answer1El.disabled = true;
  } else if (cell == 0) {
    alert("Please enter the number of cell per string.");
  } else if (cell > 300) {
    alert("No. of cell per string should not exceed 300.");
  } else if (cell <= 0) {
    alert("Enter a valid no. of cell per string.");
  } else if (cell % 1 != 0) {
    alert("Enter whole numbers only for the number of cell per string.");
  } else if (temp == 0) {
    alert("Please enter the operating temperature.");
  } else if (tempUnit == "1" && (temp < 30 || temp > 150)) {
    alert("Temperature should only range from 30 to 150 degrees Fahrenheit.");
  } else if (tempUnit == "2" && (temp < -1.11 || temp > 65.56)) {
    alert("Temperature should only range from -1.11 to 65.56 degrees Celsius.");
  } else if (voll == 0) {
    alert("Please enter the nominal voltage per cell.");
  } else if (voll < 0) {
    alert("Enter a valid nominal voltage per cell.");
  } else {
    // Temperature conversion logic — using ONLY temp, not re-reading DOM
    const tempF = tempUnit == "2" ? temp * 1.8 + 32 : temp;

    const tempFactor = (77 - tempF) * 0.0028;
    const van = parseFloat(tempFactor) + parseFloat(voll);
    const van2 = van * parseFloat(cell);

    answer1El.value = Math.round(van2 * 100) / 100;
  }
}

// new
function bo7_resetQuadData1() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const vollEl = root.querySelector("#voll");
  const cellEl = root.querySelector("#cell");
  const tempEl = root.querySelector("#temp");
  const tempUnitEl = root.querySelector("#TempUnit");
  const answer1El = root.querySelector("#answer1");

  if (vollEl) vollEl.value = "";
  if (cellEl) cellEl.value = "";
  if (tempEl) tempEl.value = "";
  if (tempUnitEl) tempUnitEl.selectedIndex = 0;

  if (answer1El) {
    answer1El.value = "";
    answer1El.disabled = false; // In case quadData1 disabled it
  }
}
// #endregion b07 =========================================================================================================

// #region b34 =========================================================================================================
function b34_fLoadFAS() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;
  const type = root.querySelector("#custom-article-div").dataset.fasType;

  if (!Array.isArray(hplFas)) return;

  const topics = hplFas.filter((item) => item.type === type);
  const indexEl = root.querySelector("#fas-index");
  if (!indexEl) return;

  indexEl.innerHTML = ""; // clear previous

  topics.forEach((topic) => fAddToFASIndex(topic, indexEl, root));
}

function fAddToFASIndex(topic, container, root) {
  const { title = "", description = "", content = "" } = topic;

  // Prevent duplicate wrapper
  if (container.querySelector(`[data-title="${title}"]`)) return;

  const wrapper = document.createElement("div");
  wrapper.style.margin = "2px";
  wrapper.setAttribute("data-title", title);

  const link = document.createElement("span");
  link.textContent = title;
  link.classList.add("span-link");

  addEventOnce(link, "click", () => fLoadFasInfo({ title, description, content }, root));

  wrapper.appendChild(link);
  container.appendChild(wrapper);
}

function fLoadFasInfo({ title = "", description = "", content = "" }, root) {
  const indexEl = root.querySelector("#fas-index");
  const introEls = root.querySelectorAll(".intro");
  const fasContent = root.querySelector("#fas-content");
  const type = root.querySelector("#custom-article-div")?.dataset.fasType;
  const typeMap = {
    fault: "Faults",
    fault2: "Faults",
    warning: "Warnings",
    warning2: "Warnings",
  };
  const mainTitle = typeMap[type] || "";

  if (!fasContent || !indexEl) return;

  indexEl.style.display = "none";
  introEls.forEach((el) => (el.style.display = "none"));

  fasContent.style.display = "block";
  fasContent.style.opacity = "0";

  // clear previous content to remain idempotent
  fasContent.innerHTML = "";

  requestAnimationFrame(() => (fasContent.style.opacity = "1"));

  createFASHolder(fasContent, title, description, content, root);
  createBread(fasContent, mainTitle, indexEl, introEls, root);
}

/* Helper Functions */
function createBread(container, mainTitle, indexEl, introEls, root) {
  // prevent duplicate bread
  if (container.querySelector('[data-role="bread"]')) return;

  const bread = document.createElement("div");
  bread.style.marginTop = "30px";
  bread.setAttribute("data-role", "bread");

  const backBtn = document.createElement("button");
  backBtn.textContent = `Back to: ${mainTitle}`;
  backBtn.style.border = "none";

  addEventOnce(backBtn, "click", () => {
    container.innerHTML = "";
    indexEl.style.display = "block";
    introEls.forEach((el) => (el.style.display = "block"));
  });

  bread.appendChild(backBtn);
  container.appendChild(bread);
}

function createFASHolder(container, title, description, content, root) {
  const formatHTML = (str) => str.replace(/\[/g, "<").replace(/\]/g, ">");

  const breadTitle = root.querySelector(".bread .title");
  if (breadTitle) breadTitle.textContent = title;

  const titleEl = document.createElement("h2");
  titleEl.textContent = title;
  container.appendChild(titleEl);

  if (description) {
    const descEl = document.createElement("div");
    descEl.innerHTML = `
      <h4>Condition</h4>
      <div>${formatHTML(description)}</div>
    `;
    container.appendChild(descEl);
  }

  if (content) {
    const contentEl = document.createElement("div");
    contentEl.innerHTML = `
      <h3>Troubleshooting</h3>
      ${formatHTML(content)}
    `;
    container.appendChild(contentEl);
    fStyleContentModal(root);
  }
}

/* Idempotent Event Helper */
function addEventOnce(el, event, handler) {
  const key = `data-init-${event}`;
  if (el.hasAttribute(key)) return;
  el.addEventListener(event, handler);
  el.setAttribute(key, "1");
}
// #endregion b34 =========================================================================================================

// #region b41 =========================================================================================================
function fDisableCopy() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const prop = root.querySelector("#prop");
  if (!prop) return;

  const propText = prop.innerHTML.replace(/<BR>/g, "\n \n");
  prop.style.display = "none";

  const container = root.querySelector("#custom-article-div");
  if (!container) return;

  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  function blockCopy(e) {
    e.preventDefault();
    alert(propText);
  }

  addEventOnce(container, "copy", blockCopy);
  addEventOnce(container, "cut", blockCopy);
  addEventOnce(container, "contextmenu", blockCopy);
}

// use also in b34
function b41_fGeneratePassword() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const serNumInput = root.querySelector("#ser_num");
  if (!serNumInput) return;

  const strVal = serNumInput.value.replace(/(\r\n\t|\n|\r\t)/gm, "").replace(/( )/g, "");

  if (strVal !== "") {
    const str = strVal + "SERVICE";
    const md5 = b41_fCreateMd5Hash(str);

    const pwrdCodeSpan = root.querySelector("#pwrd_code span");
    if (pwrdCodeSpan) {
      pwrdCodeSpan.textContent = str;
    }

    const pwrdTxt = root.querySelector("#pwrd_txt");
    const pwrdTxtSpan = pwrdTxt ? pwrdTxt.querySelector("span") : null;

    if (pwrdTxtSpan) {
      pwrdTxtSpan.textContent = md5.substring(0, 8);
    }

    if (pwrdTxt) {
      pwrdTxt.style.display = "block";
    }
  } else {
    alert("Please enter a valid serial number.");
  }
}
function b41_fCreateMd5Hash(d) {
  result = b41_M(b41_V(b41_Y(b41_X(d), 8 * d.length)));
  return result.toLowerCase();
}
function b41_M(d) {
  for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++) (_ = d.charCodeAt(r)), (f += m.charAt((_ >>> 4) & 15) + m.charAt(15 & _));
  return f;
}
function b41_X(d) {
  for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++) _[m] = 0;
  for (m = 0; m < 8 * d.length; m += 8) _[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32;
  return _;
}
function b41_V(d) {
  for (var _ = "", m = 0; m < 32 * d.length; m += 8) _ += String.fromCharCode((d[m >> 5] >>> m % 32) & 255);
  return _;
}
function b41_Y(d, _) {
  (d[_ >> 5] |= 128 << _ % 32), (d[14 + (((_ + 64) >>> 9) << 4)] = _);
  for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) {
    var h = m,
      t = f,
      g = r,
      e = i;
    (f = b41_md5_ii(
      (f = b41_md5_ii(
        (f = b41_md5_ii(
          (f = b41_md5_ii(
            (f = b41_md5_hh(
              (f = b41_md5_hh(
                (f = b41_md5_hh(
                  (f = b41_md5_hh(
                    (f = b41_md5_gg(
                      (f = b41_md5_gg(
                        (f = b41_md5_gg(
                          (f = b41_md5_gg(
                            (f = b41_md5_ff(
                              (f = b41_md5_ff(
                                (f = b41_md5_ff(
                                  (f = b41_md5_ff(
                                    f,
                                    (r = b41_md5_ff(
                                      r,
                                      (i = b41_md5_ff(i, (m = b41_md5_ff(m, f, r, i, d[n + 0], 7, -680876936)), f, r, d[n + 1], 12, -389564586)),
                                      m,
                                      f,
                                      d[n + 2],
                                      17,
                                      606105819
                                    )),
                                    i,
                                    m,
                                    d[n + 3],
                                    22,
                                    -1044525330
                                  )),
                                  (r = b41_md5_ff(
                                    r,
                                    (i = b41_md5_ff(i, (m = b41_md5_ff(m, f, r, i, d[n + 4], 7, -176418897)), f, r, d[n + 5], 12, 1200080426)),
                                    m,
                                    f,
                                    d[n + 6],
                                    17,
                                    -1473231341
                                  )),
                                  i,
                                  m,
                                  d[n + 7],
                                  22,
                                  -45705983
                                )),
                                (r = b41_md5_ff(
                                  r,
                                  (i = b41_md5_ff(i, (m = b41_md5_ff(m, f, r, i, d[n + 8], 7, 1770035416)), f, r, d[n + 9], 12, -1958414417)),
                                  m,
                                  f,
                                  d[n + 10],
                                  17,
                                  -42063
                                )),
                                i,
                                m,
                                d[n + 11],
                                22,
                                -1990404162
                              )),
                              (r = b41_md5_ff(
                                r,
                                (i = b41_md5_ff(i, (m = b41_md5_ff(m, f, r, i, d[n + 12], 7, 1804603682)), f, r, d[n + 13], 12, -40341101)),
                                m,
                                f,
                                d[n + 14],
                                17,
                                -1502002290
                              )),
                              i,
                              m,
                              d[n + 15],
                              22,
                              1236535329
                            )),
                            (r = b41_md5_gg(
                              r,
                              (i = b41_md5_gg(i, (m = b41_md5_gg(m, f, r, i, d[n + 1], 5, -165796510)), f, r, d[n + 6], 9, -1069501632)),
                              m,
                              f,
                              d[n + 11],
                              14,
                              643717713
                            )),
                            i,
                            m,
                            d[n + 0],
                            20,
                            -373897302
                          )),
                          (r = b41_md5_gg(
                            r,
                            (i = b41_md5_gg(i, (m = b41_md5_gg(m, f, r, i, d[n + 5], 5, -701558691)), f, r, d[n + 10], 9, 38016083)),
                            m,
                            f,
                            d[n + 15],
                            14,
                            -660478335
                          )),
                          i,
                          m,
                          d[n + 4],
                          20,
                          -405537848
                        )),
                        (r = b41_md5_gg(
                          r,
                          (i = b41_md5_gg(i, (m = b41_md5_gg(m, f, r, i, d[n + 9], 5, 568446438)), f, r, d[n + 14], 9, -1019803690)),
                          m,
                          f,
                          d[n + 3],
                          14,
                          -187363961
                        )),
                        i,
                        m,
                        d[n + 8],
                        20,
                        1163531501
                      )),
                      (r = b41_md5_gg(
                        r,
                        (i = b41_md5_gg(i, (m = b41_md5_gg(m, f, r, i, d[n + 13], 5, -1444681467)), f, r, d[n + 2], 9, -51403784)),
                        m,
                        f,
                        d[n + 7],
                        14,
                        1735328473
                      )),
                      i,
                      m,
                      d[n + 12],
                      20,
                      -1926607734
                    )),
                    (r = b41_md5_hh(
                      r,
                      (i = b41_md5_hh(i, (m = b41_md5_hh(m, f, r, i, d[n + 5], 4, -378558)), f, r, d[n + 8], 11, -2022574463)),
                      m,
                      f,
                      d[n + 11],
                      16,
                      1839030562
                    )),
                    i,
                    m,
                    d[n + 14],
                    23,
                    -35309556
                  )),
                  (r = b41_md5_hh(
                    r,
                    (i = b41_md5_hh(i, (m = b41_md5_hh(m, f, r, i, d[n + 1], 4, -1530992060)), f, r, d[n + 4], 11, 1272893353)),
                    m,
                    f,
                    d[n + 7],
                    16,
                    -155497632
                  )),
                  i,
                  m,
                  d[n + 10],
                  23,
                  -1094730640
                )),
                (r = b41_md5_hh(
                  r,
                  (i = b41_md5_hh(i, (m = b41_md5_hh(m, f, r, i, d[n + 13], 4, 681279174)), f, r, d[n + 0], 11, -358537222)),
                  m,
                  f,
                  d[n + 3],
                  16,
                  -722521979
                )),
                i,
                m,
                d[n + 6],
                23,
                76029189
              )),
              (r = b41_md5_hh(
                r,
                (i = b41_md5_hh(i, (m = b41_md5_hh(m, f, r, i, d[n + 9], 4, -640364487)), f, r, d[n + 12], 11, -421815835)),
                m,
                f,
                d[n + 15],
                16,
                530742520
              )),
              i,
              m,
              d[n + 2],
              23,
              -995338651
            )),
            (r = b41_md5_ii(
              r,
              (i = b41_md5_ii(i, (m = b41_md5_ii(m, f, r, i, d[n + 0], 6, -198630844)), f, r, d[n + 7], 10, 1126891415)),
              m,
              f,
              d[n + 14],
              15,
              -1416354905
            )),
            i,
            m,
            d[n + 5],
            21,
            -57434055
          )),
          (r = b41_md5_ii(
            r,
            (i = b41_md5_ii(i, (m = b41_md5_ii(m, f, r, i, d[n + 12], 6, 1700485571)), f, r, d[n + 3], 10, -1894986606)),
            m,
            f,
            d[n + 10],
            15,
            -1051523
          )),
          i,
          m,
          d[n + 1],
          21,
          -2054922799
        )),
        (r = b41_md5_ii(
          r,
          (i = b41_md5_ii(i, (m = b41_md5_ii(m, f, r, i, d[n + 8], 6, 1873313359)), f, r, d[n + 15], 10, -30611744)),
          m,
          f,
          d[n + 6],
          15,
          -1560198380
        )),
        i,
        m,
        d[n + 13],
        21,
        1309151649
      )),
      (r = b41_md5_ii(
        r,
        (i = b41_md5_ii(i, (m = b41_md5_ii(m, f, r, i, d[n + 4], 6, -145523070)), f, r, d[n + 11], 10, -1120210379)),
        m,
        f,
        d[n + 2],
        15,
        718787259
      )),
      i,
      m,
      d[n + 9],
      21,
      -343485551
    )),
      (m = b41_safe_add(m, h)),
      (f = b41_safe_add(f, t)),
      (r = b41_safe_add(r, g)),
      (i = b41_safe_add(i, e));
  }
  return Array(m, f, r, i);
}
function b41_md5_cmn(d, _, m, f, r, i) {
  return b41_safe_add(b41_bit_rol(b41_safe_add(b41_safe_add(_, d), b41_safe_add(f, i)), r), m);
}
function b41_md5_ff(d, _, m, f, r, i, n) {
  return b41_md5_cmn((_ & m) | (~_ & f), d, _, r, i, n);
}
function b41_md5_gg(d, _, m, f, r, i, n) {
  return b41_md5_cmn((_ & f) | (m & ~f), d, _, r, i, n);
}
function b41_md5_hh(d, _, m, f, r, i, n) {
  return b41_md5_cmn(_ ^ m ^ f, d, _, r, i, n);
}
function b41_md5_ii(d, _, m, f, r, i, n) {
  return b41_md5_cmn(m ^ (_ | ~f), d, _, r, i, n);
}
function b41_safe_add(d, _) {
  var m = (65535 & d) + (65535 & _);
  return (((d >> 16) + (_ >> 16) + (m >> 16)) << 16) | (65535 & m);
}
function b41_bit_rol(d, _) {
  return (d << _) | (d >>> (32 - _));
}
// #endregion b41 =========================================================================================================

// #region g13 =========================================================================================================
function g13_fSTX3450Form() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  // hide table initially
  root.querySelectorAll("#igbt_table > div").forEach((el) => {
    el.style.display = "none";
  });

  // set select widths
  root.querySelectorAll("select").forEach((el) => {
    el.style.width = "140px";
  });

  // shadow DOM select elements
  const prodName = root.querySelector("select[name='required-stX3450_prod_name-ECV3-73329']");
  const prodSize = root.querySelector("select[name='required-stX3450_prod_size-ECV3-73329']");
  const prodLoc = root.querySelector("select[name='required-stX3450_prod_loc-ECV3-73329']");

  g13_fSwitchProd(prodName, prodSize, prodLoc);
}

function g13_fSwitchProd(prodVal, prodSize, prodLoc) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const locArrCode = ["inv", "rec", "dcdc", "boost"];
  const locArrName = ["Inverter", "Rectifier/PFC", "DC/DC Converter", "Booster Module"];

  const getStorage = (name) => {
    try {
      const stored = localStorage.getItem("stored_form");
      if (!stored) return null;
      const obj = JSON.parse(stored);
      return obj[name] || null;
    } catch (e) {
      return null;
    }
  };

  const createOption = (text, value, selected) => {
    const opt = document.createElement("option");
    opt.textContent = text;
    if (value) opt.value = value;
    if (selected) opt.selected = true;
    return opt;
  };

  // -------------------------
  // 1️⃣ Restore product first
  // -------------------------
  const savedProd = getStorage(prodVal.name);
  if (savedProd && !prodVal.dataset.restored) {
    prodVal.value = savedProd;
    prodVal.dataset.restored = "true";
  }

  // -------------------------
  // 2️⃣ Trigger product change to populate options
  // -------------------------
  if (prodVal.value && !prodVal.dataset.autoTriggered) {
    prodVal.dispatchEvent(new Event("change"));
    prodVal.dataset.autoTriggered = "true";
  }

  // -------------------------
  // 3️⃣ Restore size and location (after options exist)
  // -------------------------
  // const savedSize = getStorage(prodSize.name);
  // if (savedSize && !prodSize.dataset.restored) {
  //   prodSize.value = savedSize;
  //   prodSize.dataset.restored = "true";
  // }

  // const savedLoc = getStorage(prodLoc.name);
  // if (savedLoc && !prodLoc.dataset.restored) {
  //   prodLoc.value = savedLoc;
  //   prodLoc.dataset.restored = "true";
  // }

  // -------------------------
  // 4️⃣ Prod change listener (idempotent)
  // -------------------------
  if (!prodVal.dataset.listenerAttached) {
    prodVal.addEventListener("change", () => {
      Array.from(prodSize.querySelectorAll("option"))
        .slice(1)
        .forEach((o) => o.remove());
      Array.from(prodLoc.querySelectorAll("option"))
        .slice(1)
        .forEach((o) => o.remove());

      const prod = prodVal.value;
      let sizeArray, locArray, email;

      switch (prod) {
        case "nxb":
          sizeArray = ["10_1", "15_1", "20_1", "30_1"];
          locArray = ["inv", "rec"];
          email = "liebert.nx@vertiv.com";
          break;
        case "nx480":
          sizeArray = ["40_1", "60_1", "80_1", "100_1", "120_1", "160_2", "200_2"];
          locArray = ["inv", "rec"];
          email = "liebert.nx@vertiv.com";
          break;
        case "nx225":
          sizeArray = ["225_1", "250_1", "300_1", "400_2", "500_2", "600_2"];
          locArray = ["inv", "rec", "boost"];
          email = "NX225-600@vertiv.com";
          break;
        case "exl":
          sizeArray = ["625_1", "750_1", "800_1", "1000_2", "1100_2", "1200_2"];
          locArray = ["inv", "rec", "dcdc"];
          email = "LBRT.eXL@vertiv.com";
          break;
        case "npower":
          sizeArray = ["30_1", "40_1", "50_1", "65_1", "80_1", "100_2", "130_2"];
          locArray = ["inv"];
          email = "Npower.Tech@vertiv.com";
          break;
        case "nxl":
          sizeArray = ["250_1", "300_1", "400_2", "500_2", "625_3", "750_1", "800_4", "1100_5"];
          locArray = ["inv"];
          email = "NXL.Tech@vertiv.com";
          break;
        case "s600":
          sizeArray = ["125_1", "150_1", "225_1", "300_2", "375_2", "400_2", "500_2", "625_2", "750_2"];
          locArray = ["inv"];
          email = "S600.Tech@vertiv.com";
          break;
      }

      // populate size and loc
      sizeArray.forEach((item) => {
        const arr = item.split("_");
        prodSize.appendChild(createOption(arr[0] + " kVA", item));
      });
      locArray.forEach((item) => {
        const idx = locArrCode.indexOf(item);
        if (idx !== -1) {
          prodLoc.appendChild(createOption(locArrName[idx], item));
        }
      });

      // reset size and location
      // prodSize.selectedIndex = 0;
      // prodLoc.selectedIndex = 0;
      // prodSize.dispatchEvent(new Event("change"));
      // prodLoc.dispatchEvent(new Event("change"));

      // restore saved value ONLY on first load
      const savedSize = getStorage(prodSize.name);
      if (savedSize && savedSize !== "" && !prodSize.dataset.restoredBg) {
        prodSize.value = savedSize;
        prodSize.dispatchEvent(new Event("change"));
        prodSize.style.background = "pink"; // marker for restored value
        prodSize.dataset.restoredBg = "true";
      }

      const savedLoc = getStorage(prodLoc.name);
      if (savedLoc && savedLoc !== "" && !prodLoc.dataset.restoredBg) {
        prodLoc.value = savedLoc;
        prodLoc.dispatchEvent(new Event("change"));
        prodLoc.style.background = "pink"; // marker for restored value
        prodLoc.dataset.restoredBg = "true";
      }

      const form = root.querySelector("form[id='stX3450']");
      if (form) {
        form.dataset.mailtoTemplate =
          "mailto:LogisticsPartsCoordinators@vertiv.com?cc=" +
          email +
          "&bcc=LSTechSupport@vertiv.com&subject=Service Tip X 3450: IGBT Field Test Procedure (Site ID: #Customer Site ID#)";
      }
    });

    prodVal.dataset.listenerAttached = "true";
  }

  // -------------------------
  // 5️⃣ Global select change listener (table display)
  // -------------------------
  root.querySelectorAll("select").forEach((sel) => {
    if (sel.dataset.listenerAttached) return;

    sel.addEventListener("change", () => {
      const pName = prodVal.value;
      const pSizeVal = prodSize.value;
      const pSizeArr = pSizeVal ? pSizeVal.split("_") : [];
      const pSizeID = pSizeArr[1];
      const pLoc = prodLoc.value;

      const dTarg = root.querySelector("#" + pName + "_" + pLoc + pSizeID);
      const igbtTable = root.querySelector("#igbt_table");

      root.querySelectorAll("#igbt_table > div").forEach((el) => {
        el.style.display = "none";
      });

      if (dTarg) {
        if (igbtTable) igbtTable.style.display = "block";
        dTarg.style.display = "block";
      } else {
        if (igbtTable) igbtTable.style.display = "none";
      }
    });

    sel.dataset.listenerAttached = "true";
  });

  // -------------------------
  // 6️⃣ Trigger final change to display table correctly
  // -------------------------
  if (!prodVal.dataset.finalTriggered && prodVal.value) {
    prodVal.dispatchEvent(new Event("change"));
    prodVal.dataset.finalTriggered = "true";
    if (!prodVal.dataset.restoredBg && prodVal.value !== "") {
      prodVal.style.background = "pink"; // only on first restore
      prodVal.dataset.restoredBg = "true";
    }
  }
}
// #endregion g13 =========================================================================================================

// #region g25 =========================================================================================================
function g25_loadForm() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const selects = root.querySelectorAll("select");

  selects.forEach((select) => {
    if (select.dataset.loadformBound) return;
    select.dataset.loadformBound = "true";

    select.addEventListener("change", function () {
      const targetName = this.name.replace("s-", "n-");
      const target = root.querySelector(`[name="${targetName}"]`);
      if (!target) return;

      if (this.value !== "") {
        target.value = this.value;
      } else {
        target.value = "";
      }
    });
  });

  const lengInput = root.querySelector('[name="s-leng"]');

  if (lengInput && !lengInput.dataset.loadformBound) {
    lengInput.dataset.loadformBound = "true";

    lengInput.addEventListener("keyup", function () {
      const targetName = this.name.replace("s-", "n-");
      const target = root.querySelector(`[name="${targetName}"]`);
      if (!target) return;

      if (isNaN(this.value)) {
        this.value = this.value.substring(0, this.value.length - 1);
        alert("Use numbers only.");
      } else {
        switch (this.value.length) {
          case 1:
            target.value = "00" + this.value;
            break;
          case 2:
            target.value = "0" + this.value;
            break;
          default:
            target.value = this.value;
            break;
        }
      }
    });
  }

  const inputs = root.querySelectorAll("input");

  inputs.forEach((input) => {
    if (input.name && input.name !== "s-leng") {
      input.style.textAlign = "center";
    }
  });
}

function g25_resetLoadFormFields() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;

  const form = root.querySelector('form[name="part-number"]');
  if (!form) return;

  form.querySelectorAll("select").forEach((select) => {
    select.selectedIndex = 0;
  });

  form.querySelectorAll("input[readonly]").forEach((input) => {
    if (input.name !== "n-wire") {
      input.value = "";
    }
  });

  const lengthInput = form.querySelector('input[name="s-leng"]');

  if (lengthInput) {
    lengthInput.value = "";
  }
}
// #endregion g25 =========================================================================================================

// #region g26 =========================================================================================================
function g26_fLoadPartsTab() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const selHolder = Array.from(root.querySelectorAll("#sel-holder td select"));

  if (!selHolder.length) return;

  const arrRate = ["250kVA", "300kVA", "400kVA", "500kVA 0.9PF", "625kVA 0.9PF", "625kVA 1.0PF", "750kVA 0.9PF", "800kVA 1.0PF", "1100kVA 1.0PF"];

  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  function g26_fUniqueArray(text, arr) {
    if (!arr.includes(text)) {
      arr.push(text);
      arr.sort();
    }
  }

  function g26_fLoadOptions(labels, values, select) {
    Array.from(select.querySelectorAll("option"))
      .slice(1)
      .forEach((opt) => opt.remove());

    labels.forEach((label, i) => {
      const opt = document.createElement("option");
      opt.value = values[i];
      opt.innerHTML = label;
      select.appendChild(opt);
    });
  }

  // hide extra selects
  selHolder.slice(1).forEach((sel) => {
    const td = sel.closest("td");
    if (td) td.style.display = "none";
  });

  const tabHolder = root.querySelector("#tab-holder");
  if (!tabHolder) return;

  const tabs = Array.from(tabHolder.querySelectorAll(":scope > div"));
  tabs.forEach((d) => (d.style.display = "none"));

  let loader = root.querySelector("#loader");
  if (!loader) {
    loader = document.createElement("img");
    loader.src = tkoIcons.loading;
    loader.id = "loader";
    loader.style.display = "none";
    tabHolder.appendChild(loader);
  }

  // build rate dropdown
  const arrRateID = [];
  tabs.forEach((tab) => {
    const id = tab.getAttribute("id");
    if (!id) return;
    const rateID = id.split("_")[1];
    g26_fUniqueArray(rateID, arrRateID);
  });

  g26_fLoadOptions(arrRate, arrRateID, selHolder[0]);

  // rate change
  addEventOnce(selHolder[0], "change", function () {
    tabs.forEach((d) => (d.style.display = "none"));

    const selVal = this.value;
    if (selVal !== "0") {
      const filteredTabs = tabs.filter((tab) => tab.getAttribute("id")?.includes(selVal));

      const arrLocID = ["brk", "dcbus", "inpa", "inpb", "inpc", "of", "psdc", "inpd"];
      const arrLoc = [
        "Breaker",
        "DC Bus",
        "Input Filter Disconnect Caps",
        "Input Filter AC",
        "Input Filter Disc.",
        "Output & Grass Filter",
        "Power Supply DC",
        "Input Filter and Filter Disconnect Cap",
      ];

      const arrLocTab = [];
      const arrLocTabID = [];

      filteredTabs.forEach((tab) => {
        const locID = tab.getAttribute("id")?.split("_")[2];
        const idx = arrLocID.indexOf(locID);
        if (idx !== -1) {
          g26_fUniqueArray(arrLoc[idx], arrLocTab);
          g26_fUniqueArray(locID, arrLocTabID);
        }
      });

      g26_fLoadOptions(arrLocTab, arrLocTabID, selHolder[1]);

      const td = selHolder[1].closest("td");
      if (td) td.style.display = "";
    } else {
      selHolder.slice(1).forEach((sel) => {
        const td = sel.closest("td");
        if (td) td.style.display = "none";
      });
    }
  });

  // location change
  addEventOnce(selHolder[1], "change", function () {
    const rateVal = selHolder[0].value;
    const locVal = this.value;
    const tabID = `#nxl_${rateVal}_${locVal}`;

    tabs.forEach((d) => (d.style.display = "none"));
    loader.style.display = "";

    setTimeout(() => {
      loader.style.display = "none";
      const target = root.querySelector(tabID);
      if (target) target.style.display = "";
    }, 1000);
  });
}
// #endregion g26 =========================================================================================================

// #region k04 =========================================================================================================
function k04_clearInput() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  for (let i = 1; i <= 10; i++) {
    const input = root.querySelector(`#text${i}`);
    if (input && input.value !== "") {
      input.value = "";
    }
  }

  const output = root.querySelector("#output");
  if (output) {
    output.innerHTML = "";
  }
}
// #endregion k04 =========================================================================================================

// #region m11 =========================================================================================================
function m11_attachedEvntListener() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  const selectIds = ["inp_conf", "inp_volt", "ph_ov", "ph_iv_480", "ph_iv_208", "ph_iv_600"];

  const elements = selectIds.map((id) => root.getElementById(id)).filter(Boolean);

  elements.forEach((el) => {
    addEventOnce(el, "change", function () {
      m11_fAdjustValue(this);
    });
  });
}

function m11_fAdjustValue(oID) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  // Cache commonly used elements
  const inpVolt = root.querySelector("#inp_volt");
  const voltageLabel = root.querySelector("#voltage");
  const phOV = root.querySelector("#ph_ov");
  const result = root.querySelector("#result");
  const phIVs = {
    0: root.querySelector("#ph_iv_0"),
    208: root.querySelector("#ph_iv_208"),
    480: root.querySelector("#ph_iv_480"),
    600: root.querySelector("#ph_iv_600"),
  };
  const adjustmentForm = root.querySelector("form[name='adjustment']");

  switch (oID.name) {
    case "inp_conf":
      if (oID.value === "single") {
        voltageLabel.innerHTML = "Rated Input Voltage";
        inpVolt.disabled = false;
      } else if (oID.value === "dual") {
        voltageLabel.innerHTML = "Rated Bypass Voltage";
        inpVolt.disabled = false;
      } else {
        alert("You must select a configuration.\t");
        voltageLabel.innerHTML = "Rated Input/Bypass Voltage";
        inpVolt.disabled = true;
        adjustmentForm.reset();
        m11_fAdjustValue(inpVolt);
      }
      break;

    case "inp_volt":
      // Hide all ph_iv elements
      Object.values(phIVs).forEach((el) => (el.style.display = "none"));
      // Show the selected
      const selectedIV = phIVs[oID.value] || null;
      if (selectedIV) selectedIV.style.display = "";

      // Enable / disable ph_ov and set default values
      if (oID.value === "480" || oID.value === "600") {
        phOV.disabled = false;
        phOV.value = "0";
      } else if (oID.value === "208") {
        phOV.disabled = true;
        phOV.value = "208";
      } else {
        phOV.disabled = true;
        phOV.value = "0";
      }

      m11_fAdjustValue(phOV);
      break;

    case "ph_ov":
      const inpVal = inpVolt.value;
      const phOVVal = phOV.value;
      let sInput = voltageLabel.innerHTML === "Rated Bypass Voltage" ? "bypass" : "input";

      if ((inpVal === "480" && phOVVal === "600") || (inpVal === "600" && phOVVal === "480")) {
        alert(`You can only select (208V) or (${inpVal}V) output voltage for a (${inpVal}V) ${sInput} voltage.\t`);
        phOV.value = "0";
      }

      // Reset intermediate ph_iv values
      phIVs[208].value = "0";
      phIVs[480].value = "0";
      phIVs[600].value = "0";
      if (result) result.value = "";
      break;

    default:
      // Handle ph_iv_*
      if (oID.name.startsWith("ph_iv_")) {
        if (phOV.value !== "0") {
          if (phOV.value === "208") {
            result.value = oID.value.substring(0, 3) + " V";
          } else if (phOV.value === "480" || phOV.value === "600") {
            result.value = oID.value.substring(4) + " V";
          }
        } else {
          alert("Select Output Voltage first.\t");
          oID.value = "0";
          phOV.focus();
        }
      }
      break;
  }
}
// #endregion m11 =========================================================================================================

// #region m12 =========================================================================================================
function m12_filterDependentSelect() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const prodSelect = root.querySelector("#sel_prod");
  const dwgSelect = root.querySelector("#sel_type");
  const dwgOptions = Array.from(dwgSelect.options);
  const tblContainer = root.querySelector("#container");
  const divTables = Array.from(tblContainer.querySelectorAll(":scope > div"));

  divTables.forEach((div) => {
    div.style.display = "none";

    const table = div.querySelector("table");
    const rows = table?.querySelectorAll("tr");

    if (rows.length > 5) table.classList.add("row-highlight");
  });

  fRowHighlight(root);

  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  let loader = root.querySelector("#loader");
  if (!loader) {
    loader = document.createElement("img");
    loader.src = tkoIcons.loading;
    loader.id = "loader";
    loader.style.display = "none";
    tblContainer.appendChild(loader);
  }

  addEventOnce(prodSelect, "change", function () {
    divTables.forEach((d) => (d.style.display = "none"));

    const selectedProd = prodSelect.value;

    dwgSelect.value = "0";

    if (selectedProd !== "0") {
      dwgOptions.forEach((option) => {
        if (!option.dataset.product) return; // keep placeholder

        option.hidden = selectedProd && option.dataset.product !== selectedProd;
      });
    } else {
      dwgOptions.forEach((option) => {
        if (option.dataset.product) {
          option.hidden = true;
        }
      });
    }
  });

  addEventOnce(dwgSelect, "change", function () {
    const prodVal = prodSelect?.value.toUpperCase();
    const dwgVal = this.value;
    const tabID = `#${prodVal}_${dwgVal}`;

    divTables.forEach((d) => (d.style.display = "none"));
    loader.style.display = "";

    setTimeout(() => {
      loader.style.display = "none";
      const target = root.querySelector(tabID);
      if (target) target.style.display = "";
    }, 1000);
  });
}
// #endregion m12 =========================================================================================================

// #region m13 =========================================================================================================
function m13_fBuildBattArray() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  // --- Battery Data ---
  const oBattArray = [
    "FLX100; 29",
    "FLX150; 44",
    "FLX200; 60.5",
    "FLX250; 71",
    "FLX300; 82.5",
    "FLX350; 99",
    "FLX400; 110",
    "FLX500; 132",
    "FLX540; 154",
    "FLX700; 198",
    "HR1500; 29.3",
    "HR2000; 48.4",
    "HR3000; 73",
    "HR3500; 88.2",
    "HR4000; 93.7",
    "HR5000; 133",
    "HR5500; 170",
    "HR7500; 125",
    "HRL12150; 39.2",
    "HX100; 23.9",
    "HX135B; 32.3",
    "HX135R; 32.3",
    "HX150/12HX150R-FR; 39.2",
    "HX205; 51.3",
    "HX300; 74.4",
    "HX330; 86.8",
    "HX400; 99.2",
    "HX500/HX505; 128.3",
    "HX540; 132.2",
    "HX800; 214.8",
    "UPS12-100FR; 26",
    "UPS12-140FR; 33",
    "UPS12-170FR; 50",
    "UPS12-200FR; 54",
    "UPS12-270FR; 75",
    "UPS12-310FR; 88",
    "UPS12-370FR; 100",
    "UPS12-475FR; 134",
    "UPS12-100MR; 26",
    "UPS12-150MR; 35",
    "UPS12-210MR; 53",
    "UPS12-300MR; 78",
    "UPS12-350MR; 93",
    "UPS12-400MR; 102",
    "UPS12-490MR; 139",
    "UPS12-540MR; 147",
  ];

  // --- Helper ---
  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  // --- Init ---
  ["int-batt", "ext-batt"].forEach(m13_fBuildBattForm);
  ["int", "ext"].forEach(m13_fLoadStringNos);
  m13_fLoadBattType("int", "ext");
  m13_fLoadBattType("ext", "int");

  // --- Build select ---
  function m13_fBuildBattForm(sName) {
    const container = root.querySelector(`#${sName}`);
    if (!container || container.hasAttribute("data-init-build")) return;

    const select = document.createElement("select");
    select.id = `${sName}-opt`;
    select.className = "battype";
    select.disabled = true;

    const defaultOption = document.createElement("option");
    defaultOption.value = "0";
    defaultOption.innerText = "- select -";
    select.appendChild(defaultOption);

    oBattArray.forEach((item) => {
      const [label, val] = item.split("; ");
      const opt = document.createElement("option");
      opt.value = val;
      opt.innerText = label;
      select.appendChild(opt);
    });

    container.appendChild(select);
    container.setAttribute("data-init-build", "1");
  }

  // --- Handle string change ---
  function m13_fLoadStringNos(sStr) {
    const elString = root.querySelector(`#${sStr}-string`);
    const elBattOpt = root.querySelector(`#${sStr}-batt-opt`);
    const elInt = root.querySelector("#int-string");
    const elExt = root.querySelector("#ext-string");
    const elTotal = root.querySelector("#string-no");

    if (!elString || !elBattOpt || !elInt || !elExt || !elTotal) return;

    addEventOnce(elString, "change", () => {
      const val = parseInt(elString.value) || 0;

      elBattOpt.disabled = val === 0;
      if (val === 0) elBattOpt.value = 0;

      elTotal.value = (parseInt(elInt.value) || 0) + (parseInt(elExt.value) || 0);

      elBattOpt.dispatchEvent(new Event("change"));
    });
  }

  // --- Compute capacity ---
  function m13_fLoadBattType(sPrim, sSec) {
    const primOpt = root.querySelector(`#${sPrim}-batt-opt`);
    const secOpt = root.querySelector(`#${sSec}-batt-opt`);
    const primStr = root.querySelector(`#${sPrim}-string`);
    const secStr = root.querySelector(`#${sSec}-string`);
    const elCap = root.querySelector("#cap-conf");

    if (!primOpt || !secOpt || !primStr || !secStr || !elCap) return;

    addEventOnce(primOpt, "change", () => {
      let iStringsCount = 0;
      let iBattCapacity = 0;

      if (!primOpt.disabled && primOpt.value != 0) {
        const s = parseInt(primStr.value) || 0;
        iStringsCount += s;
        iBattCapacity += s * parseFloat(primOpt.value);
      }

      if (!secOpt.disabled && secOpt.value != 0) {
        const s = parseInt(secStr.value) || 0;
        iStringsCount += s;
        iBattCapacity += s * parseFloat(secOpt.value);
      }

      elCap.value = iStringsCount > 0 ? Math.round(iBattCapacity / iStringsCount) : "";
    });
  }
}
// #endregion m13 =========================================================================================================

// #region m16 =========================================================================================================
function m16_fBuildBattArray() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  // --- Battery Data ---
  const oBattArray = [
    "16HX550F; 137",
    "16HX800F; 220",
    "16HX925F; 255",
    "FLX100; 29",
    "FLX150; 44",
    "FLX200; 60.5",
    "FLX250; 71",
    "FLX300; 82.5",
    "FLX350; 99",
    "FLX400; 110",
    "FLX500; 132",
    "FLX540; 154",
    "FLX700; 198",
    "HR1500; 29.3",
    "HR2000; 48.4",
    "HR3000; 73",
    "HR3500; 88.2",
    "HR4000; 93.7",
    "HR5000; 133",
    "HR5500; 170",
    "HR7500; 125",
    "HX100; 23.9",
    "HX135B; 32.3",
    "HX135R; 32.3",
    "HX150; 39.2",
    "HX205; 51.3",
    "HX300; 74.4",
    "HX330; 86.8",
    "HX400; 99.2",
    "HX500/HX505; 128.3",
    "HX540; 132.2",
    "HX800; 214.8",
    "UPS12-100FR; 26",
    "UPS12-140FR; 33",
    "UPS12-170FR; 50",
    "UPS12-200FR; 54",
    "UPS12-270FR; 75",
    "UPS12-310FR; 88",
    "UPS12-370FR; 100",
    "UPS12-475FR; 134",
    "UPS12-100MR; 26",
    "UPS12-150MR; 35",
    "UPS12-210MR; 53",
    "UPS12-300MR; 78",
    "UPS12-350MR; 93",
    "UPS12-400MR; 102",
    "UPS12-490MR; 139",
    "UPS12-540MR; 147",
  ];

  // --- Helper: attach one-time event ---
  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  // --- Initialize ---
  ["int-batt", "ext-batt"].forEach(m16_buildBattForm);
  ["int", "ext"].forEach(m16_loadStringNos);
  m16_loadBattType("int", "ext");
  m16_loadBattType("ext", "int");

  // --- Build <select> for battery types ---
  function m16_buildBattForm(containerId) {
    const container = root.querySelector(`#${containerId}`);
    if (!container || container.hasAttribute("data-init-build")) return;

    const select = document.createElement("select");
    select.id = `${containerId}-opt`;
    select.className = "battype";
    select.disabled = true;

    const defaultOption = document.createElement("option");
    defaultOption.value = "0";
    defaultOption.innerText = "- select -";
    select.appendChild(defaultOption);

    oBattArray.forEach((item) => {
      const [label, val] = item.split("; ");
      const opt = document.createElement("option");
      opt.value = val;
      opt.innerText = label;
      select.appendChild(opt);
    });

    container.appendChild(select);
    container.setAttribute("data-init-build", "1");
  }

  // --- Handle string count changes ---
  function m16_loadStringNos(strId) {
    const elString = root.querySelector(`#${strId}-string`);
    const elBattOpt = root.querySelector(`#${strId}-batt-opt`);
    const elInt = root.querySelector("#int-string");
    const elExt = root.querySelector("#ext-string");
    const elTotal = root.querySelector("#string-no");
    if (!elString || !elBattOpt || !elInt || !elExt || !elTotal) return;

    addEventOnce(elString, "change", () => {
      const val = parseInt(elString.value) || 0;
      elBattOpt.disabled = val === 0;
      if (val === 0) elBattOpt.value = 0;

      elTotal.value = (parseInt(elInt.value) || 0) + (parseInt(elExt.value) || 0);

      // Trigger capacity calculation
      elBattOpt.dispatchEvent(new Event("change"));
    });
  }

  // --- Compute battery capacity based on type and string ---
  function m16_loadBattType(primId, secId) {
    const primOpt = root.querySelector(`#${primId}-batt-opt`);
    const secOpt = root.querySelector(`#${secId}-batt-opt`);
    const primStr = root.querySelector(`#${primId}-string`);
    const secStr = root.querySelector(`#${secId}-string`);
    const elCap = root.querySelector("#cap-conf");
    if (!primOpt || !secOpt || !primStr || !secStr || !elCap) return;

    addEventOnce(primOpt, "change", () => {
      let totalStrings = 0;
      let totalCapacity = 0;

      if (!primOpt.disabled && primOpt.value != 0) {
        const s = parseInt(primStr.value) || 0;
        totalStrings += s;
        totalCapacity += s * parseFloat(primOpt.value);
      }

      if (!secOpt.disabled && secOpt.value != 0) {
        const s = parseInt(secStr.value) || 0;
        totalStrings += s;
        totalCapacity += s * parseFloat(secOpt.value);
      }

      elCap.value = totalStrings > 0 ? Math.round(totalCapacity / totalStrings) : "";
    });
  }
}
// #endregion m16 =========================================================================================================

// #region m17 =========================================================================================================
function m17_fBuildBattArray() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  // --- Battery Data (unchanged logic) ---
  const oBattArray = [
    "FLX100; 29",
    "FLX150; 44",
    "FLX200; 60.5",
    "FLX250; 71",
    "FLX300; 82.5",
    "FLX350; 99",
    "FLX400; 110",
    "FLX500; 132",
    "FLX540; 154",
    "FLX700; 198",
    "HR1500; 29.3",
    "HR2000; 48.4",
    "HR3000; 73",
    "HR3500; 88.2",
    "HR4000; 93.7",
    "HR5000; 133",
    "HR5500; 170",
    "HR7500; 125",
    "HRL12150; 39.2",
    "HX100; 23.9",
    "HX135B; 32.3",
    "HX135R; 32.3",
    "HX150; 39.2",
    "HX205; 51.3",
    "HX300; 74.4",
    "HX330; 86.8",
    "HX400; 99.2",
    "HX500/HX505; 128.3",
    "HX540; 132.2",
    "HX800; 214.8",
    "UPS12-100FR; 26",
    "UPS12-140FR; 33",
    "UPS12-170FR; 50",
    "UPS12-200FR; 54",
    "UPS12-270FR; 75",
    "UPS12-310FR; 88",
    "UPS12-370FR; 100",
    "UPS12-475FR; 134",
    "UPS12-100MR; 26",
    "UPS12-150MR; 35",
    "UPS12-210MR; 53",
    "UPS12-300MR; 78",
    "UPS12-350MR; 93",
    "UPS12-400MR; 102",
    "UPS12-490MR; 139",
    "UPS12-540MR; 147",
  ];

  ["int-batt", "ext-batt"].forEach(m17_buildBattForm);
  ["int", "ext"].forEach(m17_loadStringNos);
  m17_loadBattType("int", "ext");
  m17_loadBattType("ext", "int");

  // Helpers
  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  // Build <select> for battery types
  function m17_buildBattForm(sName) {
    const container = root.querySelector(`#${sName}`);
    if (!container || container.hasAttribute("data-init-build")) return;

    const select = document.createElement("select");
    select.id = `${sName}-opt`;
    select.className = "battype";
    select.disabled = true;

    const first = document.createElement("option");
    first.value = "0";
    first.innerText = "- select -";
    select.appendChild(first);

    oBattArray.forEach((item) => {
      const [label, val] = item.split("; ");
      const opt = document.createElement("option");
      opt.value = val;
      opt.innerText = label;
      select.appendChild(opt);
    });

    container.appendChild(select);
    container.setAttribute("data-init-build", "1");
  }

  // Handle string count changes
  function m17_loadStringNos(sStr) {
    const elString = root.querySelector(`#${sStr}-string`);
    const elBattOpt = root.querySelector(`#${sStr}-batt-opt`);
    const elInt = root.querySelector("#int-string");
    const elExt = root.querySelector("#ext-string");
    const elTotal = root.querySelector("#string-no");
    if (!elString || !elBattOpt || !elInt || !elExt || !elTotal) return;

    addEventOnce(elString, "change", () => {
      const val = parseInt(elString.value) || 0;
      elBattOpt.disabled = val === 0;
      if (val === 0) elBattOpt.value = 0;

      elTotal.value = (parseInt(elInt.value) || 0) + (parseInt(elExt.value) || 0);

      elBattOpt.dispatchEvent(new Event("change"));
    });
  }

  // Load battery type + compute capacities
  function m17_loadBattType(sPrim, sSec) {
    const primOpt = root.querySelector(`#${sPrim}-batt-opt`);
    const secOpt = root.querySelector(`#${sSec}-batt-opt`);
    const primStr = root.querySelector(`#${sPrim}-string`);
    const secStr = root.querySelector(`#${sSec}-string`);
    const elCap = root.querySelector("#cap-conf");
    if (!primOpt || !secOpt || !primStr || !secStr || !elCap) return;

    addEventOnce(primOpt, "change", () => {
      let iStringsCount = 0;
      let iBattCapacity = 0;

      if (!primOpt.disabled && primOpt.value != 0) {
        const s = parseInt(primStr.value) || 0;
        iStringsCount += s;
        iBattCapacity += s * parseFloat(primOpt.value);
      }

      if (!secOpt.disabled && secOpt.value != 0) {
        const s = parseInt(secStr.value) || 0;
        iStringsCount += s;
        iBattCapacity += s * parseFloat(secOpt.value);
      }

      elCap.value = iStringsCount > 0 ? Math.round(iBattCapacity / iStringsCount) : "";
    });
  }
}
// #endregion m17 =========================================================================================================

// #region m19 =========================================================================================================
function m19_fBuildBattArray() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  // --- Battery Data (unchanged logic) ---
  const oBattArray = [
    "FLX100; 29",
    "FLX150; 44",
    "FLX200; 60.5",
    "FLX250; 71",
    "FLX300; 82.5",
    "FLX350; 99",
    "FLX400; 110",
    "FLX500; 132",
    "FLX540; 154",
    "FLX700; 198",

    "HR1500; 29.3",
    "HR2000; 48.4",
    "HR3000; 73",
    "HR3500; 88.2",
    "HR4000; 93.7",
    "HR5000; 133",
    "HR5500; 170",
    "HR7500; 125",

    "HRL12150; 39.2",
    "HRL12110W; 28",

    "HX100; 23.9",
    "HX135B; 32.3",
    "HX135R; 32.3",
    "HX150; 39.2",
    "HX205; 51.3",
    "HX300; 74.4",
    "HX330; 86.8",
    "HX400; 99.2",
    "HX500/HX505; 128.3",
    "HX540; 132.2",
    "HX800; 214.8",

    "UPS12-100FR; 26",
    "UPS12-140FR; 33",
    "UPS12-170FR; 50",
    "UPS12-200FR; 54",
    "UPS12-270FR; 75",
    "UPS12-310FR; 88",
    "UPS12-370FR; 100",
    "UPS12-475FR; 134",

    "UPS12-100MR; 26",
    "UPS12-150MR; 35",
    "UPS12-210MR; 53",
    "UPS12-300MR; 78",
    "UPS12-350MR; 93",
    "UPS12-400MR; 102",
    "UPS12-490MR; 139",
    "UPS12-540MR; 147",
  ];

  m19_buildBattForm("int-batt");
  m19_buildBattForm("ext-batt");
  m19_loadStringNos("int");
  m19_loadStringNos("ext");
  m19_loadBattType("int", "ext");
  m19_loadBattType("ext", "int");

  // ---------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------
  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  // ---------------------------------------------------------------------
  // Build <select> for battery types
  // ---------------------------------------------------------------------
  function m19_buildBattForm(sName) {
    const container = root.querySelector(`#${sName}`);
    if (!container || container.hasAttribute("data-init-build")) return;

    const select = document.createElement("select");
    select.id = `${sName}-opt`;
    select.className = "battype";
    select.disabled = true;

    // Populate options
    const first = document.createElement("option");
    first.value = "0";
    first.innerText = "- select -";
    select.appendChild(first);

    for (let i = 0; i < oBattArray.length; i++) {
      const [label, val] = oBattArray[i].split("; ");
      const opt = document.createElement("option");
      opt.value = val;
      opt.innerText = label;
      select.appendChild(opt);
    }

    container.appendChild(select);
    container.setAttribute("data-init-build", "1");
  }

  // ---------------------------------------------------------------------
  // Handle string count changes
  // ---------------------------------------------------------------------
  function m19_loadStringNos(sStr) {
    const elString = root.querySelector(`#${sStr}-string`);
    const elBattOpt = root.querySelector(`#${sStr}-batt-opt`);
    const elInt = root.querySelector("#int-string");
    const elExt = root.querySelector("#ext-string");
    const elTotal = root.querySelector("#string-no");

    if (!elString || !elBattOpt || !elInt || !elExt || !elTotal) return;

    addEventOnce(elString, "change", () => {
      const val = elString.value;
      if (val != 0) {
        elBattOpt.disabled = false;
      } else {
        elBattOpt.disabled = true;
        elBattOpt.value = 0;
      }

      elTotal.value = "" ? 0 : parseInt(elInt.value || 0) + parseInt(elExt.value || 0);

      elBattOpt.dispatchEvent(new Event("change"));
    });
  }

  // ---------------------------------------------------------------------
  // Load battery type + compute capacities
  // ---------------------------------------------------------------------
  function m19_loadBattType(sPrim, sSec) {
    const primOpt = root.querySelector(`#${sPrim}-batt-opt`);
    const secOpt = root.querySelector(`#${sSec}-batt-opt`);
    const primStr = root.querySelector(`#${sPrim}-string`);
    const secStr = root.querySelector(`#${sSec}-string`);
    const elCap = root.querySelector("#cap-conf");

    if (!primOpt || !secOpt || !primStr || !secStr || !elCap) return;

    addEventOnce(primOpt, "change", () => {
      let iStringsCount = 0;
      let iBattCapacity = 0;

      if (!primOpt.disabled && primOpt.value != 0) {
        const s = parseInt(primStr.value);
        iStringsCount += s;
        iBattCapacity += primOpt.value * s;
      }

      if (!secOpt.disabled && secOpt.value != 0) {
        const s = parseInt(secStr.value);
        iStringsCount += s;
        iBattCapacity += secOpt.value * s;
      }

      if (iStringsCount > 0) {
        elCap.value = Math.round(iBattCapacity / iStringsCount);
      } else {
        elCap.value = "";
      }
    });
  }
}
// #endregion m19 =========================================================================================================

// #region m29 =========================================================================================================
function fCalcLoadTest(tabID) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;
  const table = root.querySelector(`table#${tabID}`);
  if (!table) return;

  // Helper: get numeric input by name
  function getInput(name) {
    const el = table.querySelector(`input[name=${name}]`);
    return el ? parseFloat(el.value) : NaN;
  }

  // Read all values
  const values = {
    line_ab0: getInput("line_ab0"),
    line_bc0: getInput("line_bc0"),
    line_ca0: getInput("line_ca0"),
    line_ab50: getInput("line_ab50"),
    line_bc50: getInput("line_bc50"),
    line_ca50: getInput("line_ca50"),
    line_ab100: getInput("line_ab100"),
    line_bc100: getInput("line_bc100"),
    line_ca100: getInput("line_ca100"),
  };

  const arrLoad0 = [values.line_ab0, values.line_bc0, values.line_ca0];
  const arrLoad50 = [values.line_ab50, values.line_bc50, values.line_ca50];
  const arrLoad100 = [values.line_ab100, values.line_bc100, values.line_ca100];

  const vHi0 = Math.max(...arrLoad0);
  const vHi50 = Math.max(...arrLoad50);
  const vHi100 = Math.max(...arrLoad100);

  const vLo0 = Math.min(...arrLoad0);
  const vLo50 = Math.min(...arrLoad50);
  const vLo100 = Math.min(...arrLoad100);

  const vAveNL = (values.line_ab0 + values.line_bc0 + values.line_ca0) / 3;
  const vAveFL = (values.line_ab100 + values.line_bc100 + values.line_ca100) / 3;
  const vAveREG = ((vAveNL - vAveFL) / vAveNL) * 100;

  const vBal0 = ((vHi0 - vLo0) / vLo0) * 100;
  const vBal50 = ((vHi50 - vLo50) / vLo50) * 100;
  const vBal100 = ((vHi100 - vLo100) / vLo100) * 100;

  // Validation
  if (isNaN(vAveNL) || isNaN(vAveFL) || isNaN(vAveREG)) {
    alert("Please enter a valid number.");
    return;
  }

  // Helper: update span
  function updateSpan(selector, text) {
    const el = table.querySelector(selector);
    if (el) {
      el.textContent = text;
      el.style.fontWeight = "bold";
    }
  }

  // Update outputs
  updateSpan("span.out_nl", `${vAveNL.toFixed(1)} V`);
  updateSpan("span.out_fl", `${vAveFL.toFixed(1)} V`);
  updateSpan("span.out_reg", `${vAveREG.toFixed(1)} %`);

  updateSpan("span.out_hi0", `${vHi0} V`);
  updateSpan("span.out_hi50", `${vHi50} V`);
  updateSpan("span.out_hi100", `${vHi100} V`);

  updateSpan("span.out_lo0", `${vLo0} V`);
  updateSpan("span.out_lo50", `${vLo50} V`);
  updateSpan("span.out_lo100", `${vLo100} V`);

  updateSpan("span.out_bal0", `${vBal0.toFixed(1)} %`);
  updateSpan("span.out_bal50", `${vBal50.toFixed(1)} %`);
  updateSpan("span.out_bal100", `${vBal100.toFixed(1)} %`);
}
// #endregion m29 =========================================================================================================

// #region p00 =========================================================================================================
function p00_fX3515Fxn() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  /*** === fStyleForm === ***/
  const forms = root.querySelectorAll("form");
  forms.forEach((form) => {
    form.style.width = "730px";
    form.style.marginLeft = "auto";
    form.style.marginRight = "auto";

    // Subsections
    const subsections = form.querySelectorAll(".subsection");
    subsections.forEach((sub) => {
      sub.style.border = "2px solid #3c3c3c";
      sub.style.padding = "10px";
      sub.style.marginBottom = "auto";
      sub.style.backgroundColor = "#eeeeee";
    });

    // Headings
    const headings = form.querySelectorAll("h3");
    headings.forEach((h) => {
      h.style.marginTop = "16px";
    });
  });

  // Hide condition divs
  const conditionDivs = root.querySelectorAll(".condition > div");
  conditionDivs.forEach((div) => {
    div.style.display = "none";
  });

  /*** === fRadioConditional === ***/
  const radios = root.querySelectorAll('input[type="radio"]');

  radios.forEach((radio) => {
    const wrapper = radio.closest("div");
    if (!wrapper) return;

    const condition = wrapper.nextElementSibling;
    if (!condition || !condition.classList.contains("condition")) return;

    const divs = condition.querySelectorAll("div");

    if (radio.dataset.p00Listener) return;
    radio.dataset.p00Listener = "true";

    radio.addEventListener("click", () => {
      const sCond = "conditional-" + radio.id;

      divs.forEach((div) => {
        div.style.display = "none"; // hide all first
      });

      const target = condition.querySelector("." + sCond);
      if (target) {
        target.style.display = "block";
      }

      divs.forEach((div) => {
        if (div !== target) {
          div.querySelectorAll("input, textarea").forEach((el) => {
            if (el.type !== "file") el.value = " ";
          });
        }
      });
    });
  });

  // Show pre-checked radio conditional on load
  const checkedRadio = root.querySelector('input[type="radio"]:checked');
  if (checkedRadio) {
    const condClass = "conditional-" + checkedRadio.id;
    conditionDivs.forEach((div) => {
      div.style.display = div.classList.contains(condClass) ? "block" : "none";
    });
  }

  function fSetInpVal(inp, val) {
    if (isNaN(val) || val == "Infinity") {
      inp.value = "";
    } else {
      inp.value = val;
    }
  }

  function fCheckNumInput(input) {
    const sVal = input.value;

    let span = input.nextElementSibling;
    if (!span || span.tagName !== "SPAN") span = null;

    if (isNaN(sVal) || sVal === "") {
      if (span) span.remove();

      const sText = document.createElement("span");
      sText.textContent = "Please enter a number.";
      sText.style.color = "red";
      sText.style.fontStyle = "italic";
      sText.style.margin = "0px 10px";

      input.insertAdjacentElement("afterend", sText);
    } else {
      if (span) span.remove();
    }
  }

  /*** === fCalcSubSec2 === ***/
  const inpBattPwr = root.querySelector('input[name="ebc_batt_power-ECV3-32526"]');
  const inpMaxOpCurr = root.querySelector('input[name="ebc_max_op_curr-ECV3-32526"]');
  const subsection2 = root.querySelectorAll(".subsection")[2];
  if (subsection2) {
    const inputs2 = Array.from(subsection2.querySelectorAll("input")).filter((inp) => !inp.readOnly && !inp.dataset.p00Listener);

    inputs2.forEach((inp) => {
      inp.dataset.p00Listener = "true"; // prevent duplicate listeners
      inp.addEventListener("keyup", () => {
        fCheckNumInput(inp);

        const inpUPSSize = root.querySelector('input[name="ebc_ups_size-ECV3-32526"]').value;
        const inpPFactor = root.querySelector('input[name="ebc_pwr_factor-ECV3-32526"]').value;
        const inpEffic = root.querySelector('input[name="ebc_efficiency-ECV3-32526"]').value;
        const inpNumCell = root.querySelector('input[name="ebc_num_cells-ECV3-32526"]').value;

        let nBattPwr = (inpUPSSize * inpPFactor) / inpEffic;
        let maxOpCurr = nBattPwr / (inpNumCell * 1.65);

        nBattPwr = nBattPwr.toFixed(2);
        maxOpCurr = maxOpCurr.toFixed(2);

        fSetInpVal(inpBattPwr, nBattPwr);
        fSetInpVal(inpMaxOpCurr, maxOpCurr);
      });
    });
  }

  /*** === fCalcSubSec3 === ***/
  const inpSCFactor = root.querySelector('input[name="ebc_sc_calc_factor-ECV3-32526"]');
  const inpSCDetVal = root.querySelector('input[name="ebc_sc_curr_detec-ECV3-32526"]');
  const subsection3 = root.querySelectorAll(".subsection")[3];
  if (subsection3) {
    const inputs3 = Array.from(subsection3.querySelectorAll("input")).filter((inp) => !inp.readOnly && !inp.dataset.p00Listener);

    inputs3.forEach((inp) => {
      inp.dataset.p00Listener = "true"; // prevent duplicate listeners
      inp.addEventListener("keyup", () => {
        fCheckNumInput(inp);

        const inpBattVolt = root.querySelector('input[name="ebc_batt_voltage-ECV3-32526"]').value;
        const inpBattImp = root.querySelector('input[name="ebc_inter_imped-ECV3-32526"]').value;
        const inpBattAge = root.querySelector('input[name="ebc_batt_age-ECV3-32526"]').value;
        const inpBattCab = root.querySelector('input[name="ebc_cable_length-ECV3-32526"]').value;

        const sInpSCFactor = inpBattAge > 4 || inpBattCab > 9 ? 0.7 : 0.8;
        let sInpSCDetVal = (sInpSCFactor * inpBattVolt) / inpBattImp;

        sInpSCDetVal = sInpSCDetVal.toFixed(2);

        fSetInpVal(inpSCFactor, sInpSCFactor);
        fSetInpVal(inpSCDetVal, sInpSCDetVal);
      });
    });
  }
}
// #endregion p00 =========================================================================================================

// #region p61 =========================================================================================================
function p61_fLoadASCOParts() {
  p61_fCreateASCOPartsSel();
  p61_fSelASCOPartsTab();
}

function p61_fCreateASCOPartsSel() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "true");
  }

  function uniquePush(val, arr) {
    if (!arr.includes(val)) arr.push(val);
  }

  function loadOptions(values, select) {
    [...select.options].slice(1).forEach((o) => o.remove());
    values.forEach((v) => {
      const opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      select.appendChild(opt);
    });
  }

  function createOptArray(selFrame, selType, selAmps, arrTabID) {
    addEventOnce(selFrame, "change", () => {
      [...selAmps.options].slice(1).forEach((o) => o.remove());

      const frameVal = selFrame.value;
      const arr = [];

      arrTabID.forEach((val) => {
        if (val.split("_")[0] === frameVal) {
          uniquePush(val.split("_")[1], arr);
        }
      });

      arr.sort();
      loadOptions(arr, selType);
    });

    addEventOnce(selType, "change", () => {
      const frameVal = selFrame.value;
      const typeVal = selType.value;
      const arr = [];

      arrTabID.forEach((val) => {
        if (val.split("_")[0] === frameVal && val.includes(typeVal)) {
          const text = val.split("_")[2];
          for (let i = 0; i < text.length; i++) {
            uniquePush(text, arr);
          }
        }
      });

      arr.sort((a, b) => a - b);
      loadOptions(arr, selAmps);
    });
  }

  const tabHolder = root.querySelector("#p61_tab-holder");
  const selKva = root.querySelector("#sel_kva");
  const selVdc = root.querySelector("#sel_vdc");
  const selVac = root.querySelector("#sel_vac");

  if (!tabHolder || !selKva || !selVdc || !selVac) {
    throw new Error("Missing required elements");
  }

  const arrTabID = [];
  const aFrame = [];

  tabHolder.querySelectorAll("div").forEach((div) => {
    const cls = div.getAttribute("class");
    if (!cls) return;

    uniquePush(cls, arrTabID);
    uniquePush(cls.split("_")[0], aFrame);
  });

  loadOptions(aFrame, selKva);
  createOptArray(selKva, selVdc, selVac, arrTabID);

  if (!tabHolder.querySelector("#loader")) {
    const img = document.createElement("img");
    img.src = tkoIcons.loading;
    img.id = "loader";
    img.style.display = "none";
    tabHolder.appendChild(img);
  }
}

function p61_fSelASCOPartsTab() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "true");
  }

  root.querySelectorAll("select").forEach((sel) => {
    addEventOnce(sel, "change", () => {
      const frame = root.querySelector("#sel_kva")?.value || "";
      const type = root.querySelector("#sel_vdc")?.value || "";
      const amps = root.querySelector("#sel_vac")?.value || "";
      p61_fShowASCOPartsTab(frame, type, amps);
    });
  });
}

function p61_fShowASCOPartsTab(frame, type, amps) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const tabHolder = root.querySelector("#p61_tab-holder");
  const loader = root.querySelector("#loader");
  if (!tabHolder) return;

  const targetClass = `${frame}_${type}_${amps}`;
  const children = [...tabHolder.children];

  let target = null;

  children.forEach((el) => {
    el.style.display = "none";
    if (el.classList.contains(targetClass)) {
      target = el;
    }
  });

  if (target) {
    if (loader) loader.style.display = "block";

    setTimeout(() => {
      if (loader) loader.style.display = "none";
      target.style.display = "block";
    }, 1000);
  }
}
// #endregion p61 =========================================================================================================

// #region p72 =========================================================================================================
function p72_fMACSwitch() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const inp = root.querySelector("#mac_id");
  if (!inp) return;

  // $('#mac_id').css('width', '50px')
  inp.style.width = "50px";

  // $('<div/>').html(...).insertAfter($(inp).closest('table')).addClass('errMsg')
  const error = document.createElement("div");
  error.innerHTML = "<sup>*</sup>Please enter the MAC ID (between 0 and 63) to display switch settings.";
  error.classList.add("errMsg");

  const table = inp.closest("table");
  if (table && table.parentNode) {
    table.parentNode.insertBefore(error, table.nextSibling);
  }

  // var td = $(inp).closest('td').siblings('td').css('width', '30px')
  const tdParent = inp.closest("td");
  const td = tdParent ? Array.from(tdParent.parentElement.children).filter((el) => el.tagName === "TD" && el !== tdParent) : [];

  td.forEach((cell) => {
    cell.style.width = "30px";
  });

  // $(inp).val('')
  inp.value = "";

  // $(inp).keyup(function(){ ... })
  inp.addEventListener("keyup", function () {
    const val = this.value;

    if (isNaN(val) || val > 63 || val < 0) {
      alert("Please type a number from 0 and 63.");
      this.value = "";
      td.forEach((cell) => (cell.textContent = ""));
    } else if (val === "") {
      td.forEach((cell) => (cell.textContent = ""));
    } else {
      let bin = "00000" + parseInt(val).toString(2);
      bin = bin.substr(bin.length - 6);

      td.forEach((cell) => (cell.textContent = ""));

      for (let i = 0; i <= bin.length; i++) {
        if (!td[i]) continue;

        if (bin.charAt(i) === "1") {
          td[i].textContent = "ON";
          td[i].style.color = "green";
          td[i].style.textAlign = "center";
        } else if (bin.charAt(i) === "0") {
          td[i].textContent = "OFF";
          td[i].style.color = "red";
          td[i].style.textAlign = "center";
        }
      }
    }
  });
}
// #endregion p72 =========================================================================================================

// #region p86 =========================================================================================================
function p86_fLoadTabLink(root) {
  if (!root) return;

  const tabs = root.querySelectorAll(".tab-link");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    const links = tab.querySelectorAll("span[class^='tab-link']");
    const tabRef = tab.parentElement.querySelector(".tab-target");
    if (!tabRef) return;

    const divs = Array.from(tabRef.children);
    divs.forEach((d) => (d.style.display = "none"));

    links.forEach((link) => {
      // Initial styling
      link.style.color = "#003300";
      link.style.cursor = "pointer";
      link.style.borderBottom = "1px dotted #333333";

      // Hover effect — idempotent
      const hoverKey = "data-init-hover";
      if (!link.hasAttribute(hoverKey)) {
        link.addEventListener("mouseenter", () => {
          link.style.color = "#c8a040";
          link.style.borderBottom = "1px dotted #c8a040";
        });
        link.addEventListener("mouseleave", () => {
          link.style.color = "#003300";
          link.style.borderBottom = "1px dotted #333333";
        });
        link.setAttribute(hoverKey, "1");
      }

      // Click event — idempotent
      const clickKey = "data-init-click";
      if (!link.hasAttribute(clickKey)) {
        link.addEventListener("click", () => {
          const tabID = link.getAttribute("class");

          divs.forEach((d) => {
            if (d.id === tabID) {
              d.style.display = "block";
              d.style.opacity = "0";
              d.style.transition = "opacity 0.5s";
              requestAnimationFrame(() => (d.style.opacity = "1"));
            } else {
              d.style.display = "none";
              d.style.opacity = "";
              d.style.transition = "";
            }
          });
        });

        link.setAttribute(clickKey, "1");
      }
    });
  });
}
// #endregion p86 =========================================================================================================

// #region r05 =========================================================================================================
// eventlister for a specific article (new)
function rm_r05_submitSurvey() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) {
    console.error("Shadow root not found for .custom-article-content");
    return;
  }

  const root = host.shadowRoot;

  // Access your form container inside the shadow root
  const container = root.querySelector("#custom-article-div");
  if (!container) {
    console.error("#custom-article-div not found inside shadow root");
    return;
  }

  // Collect all input and textarea fields
  const fields = container.querySelectorAll("input, textarea");
  const formData = {};

  fields.forEach((el) => {
    if (el.type === "radio") {
      if (el.checked) formData[el.name] = el.value;
    } else if (el.type !== "button") {
      formData[el.name] = el.value;
    }
  });

  // Build email body
  const body = Object.entries(formData)
    .map(([key, val]) => `${key}: ${val}`)
    .join("%0D%0A"); // newline for mailto body

  const subject = "BDS-40 Site Survey Submission";
  const recipient = "albersurveys@EmersonNetworkPower.com";
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${body}`;

  // Trigger default mail client
  window.location.href = mailto;
}
// #endregion r05 =========================================================================================================

// #region s17 =========================================================================================================
function s17_fBuildBattArray() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const battArray = [
    "HRL1234WF2FR; 4; 9.00_34; 0.85; 4.3",
    "HRL1280WFR; 5; 20.00_80; 2.00; 8",
    "HRL12110WFR; 5; 27.50_110; 2.75; 11",
    "HRL12150WFR; 5; 37.50_150; 3.75; 15",
    "HRL12200WFR; 5; 50.00_200; 5.00; 20",
    "HRL12280WFR; 5; 70.00_280; 7.00; 28",
    "HRL12330WFR; 5; 83.00_330; 8.25; 33",
    "HRL12390WFR; 5; 98.00_390; 9.75; 39",
    "HRL12540WFR; 5; 135.00_540; 13.5; 54",
  ];

  function getEl(sel) {
    return root.querySelector(sel);
  }

  function fGetCellCount() {
    const frame = getEl("#frame");
    const cellCount = getEl("#cell-count");

    frame.addEventListener("change", () => {
      let val = "";

      switch (frame.value) {
        case "2":
          val = 168;
          break;
        case "3":
        case "5":
          val = 120;
          break;
      }

      cellCount.value = val;
    });
  }

  function fCheckBattType() {
    const battType = getEl("#batt-type");

    battType.addEventListener("change", () => {
      fResetBattForm();

      if (battType.value !== "0") {
        fBuildBattForm("int-batt", battType.value);
        fBuildBattForm("ext-batt", battType.value);
        fLoadStringNos("int");
        fLoadStringNos("ext");
        fLoadBattType("int", "ext");
        fLoadBattType("ext", "int");
      }
    });
  }

  function fResetBattForm() {
    root.querySelectorAll("#int-batt-opt, #ext-batt-opt").forEach((el) => el.remove());
  }

  function fBuildBattForm(containerId, type) {
    const container = getEl(`#${containerId}`);

    const select = document.createElement("select");
    select.id = `${containerId}-opt`;
    select.disabled = true;
    select.className = "battype";

    for (let i = 0; i <= battArray.length; i++) {
      const option = document.createElement("option");

      if (i === 0) {
        option.value = 0;
        option.textContent = "- select -";
      } else {
        const [model, life, nominal, min, max] = battArray[i - 1].split("; ");
        const capacity = nominal.split("_")[type - 1];

        option.value = `${capacity}_${life}_${min}_${max}`;
        option.textContent = model;
      }

      select.appendChild(option);
    }

    container.appendChild(select);
  }

  function fLoadStringNos(prefix) {
    const stringInput = getEl(`#${prefix}-string`);
    const battOpt = getEl(`#${prefix}-batt-opt`);
    const stringNo = getEl("#string-no");

    stringInput.addEventListener("change", () => {
      battOpt.disabled = stringInput.value === "0";
      if (battOpt.disabled) battOpt.value = 0;

      const intVal = parseFloat(getEl("#int-string").value || 0);
      const extVal = parseFloat(getEl("#ext-string").value || 0);
      stringNo.value = intVal + extVal;

      battOpt.dispatchEvent(new Event("change"));
    });
  }

  function fLoadBattType(primary, secondary) {
    const primOpt = getEl(`#${primary}-batt-opt`);
    const secOpt = getEl(`#${secondary}-batt-opt`);

    primOpt.addEventListener("change", () => {
      let strings = 0;
      let capacity = 0;

      if (!primOpt.disabled && primOpt.value !== "0") {
        const count = parseFloat(getEl(`#${primary}-string`).value);
        strings += count;
        capacity += parseFloat(primOpt.value.split("_")[0]) * count;

        getEl("#batt-life").value = primOpt.value.split("_")[1];
        fGetMinMaxCharge();
      }

      if (!secOpt.disabled && secOpt.value !== "0") {
        const count = parseFloat(getEl(`#${secondary}-string`).value);
        strings += count;
        capacity += parseFloat(secOpt.value.split("_")[0]) * count;
      }

      getEl("#cap-conf").value = strings > 0 ? (capacity / strings).toFixed(2) : "";

      if (strings > 0) fGetBattLife(primOpt, secOpt);
    });
  }

  function fGetMinMaxCharge() {
    setTimeout(() => {
      const num = (v) => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));

      const intOpt = getEl("#int-batt-opt").value.split("_");
      const extOpt = getEl("#ext-batt-opt").value.split("_");

      const battType = (() => {
        switch (getEl("#batt-type").value) {
          case "1":
            return 1;
          case "2":
            return 4;
          default:
            return 0;
        }
      })();

      const intStr = parseFloat(getEl("#int-string").value);
      const extStr = parseFloat(getEl("#ext-string").value);
      const cap = parseFloat(getEl("#cap-conf").value);
      const totalStr = parseFloat(getEl("#string-no").value);

      const min = ((num(intOpt[2]) * intStr + num(extOpt[2]) * extStr) * battType) / (cap * totalStr);

      const max = ((num(intOpt[3]) * intStr + num(extOpt[3]) * extStr) * battType) / (cap * totalStr);

      getEl("#min-limit").value = min.toFixed(2);
      getEl("#max-limit").value = max.toFixed(2);
    }, 500);
  }

  function fGetBattLife(oPrim, oSec) {
    const p = parseFloat(oPrim.value.split("_")[1]);
    const s = parseFloat(oSec.value.split("_")[1]);
    getEl("#batt-life").value = Math.min(p, s);
  }

  // entry point
  fCheckBattType();
  fGetCellCount();
}
function s17_fCalcTotalAmps(tabID) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const tab = root.querySelector(`table#${tabID}`);
  if (!tab) return;

  const nomBat = parseFloat(tab.querySelector("input[name='nom-bat']")?.value);
  const curLimit = parseFloat(tab.querySelector("input[name='cur-limit']")?.value);
  const batString = parseFloat(tab.querySelector("input[name='bat-string']")?.value);

  const battTypeInput = tab.querySelector("input[type='radio'][name='batt_type_calc']:checked");
  const battType = parseFloat(battTypeInput?.value);

  const totalAmps = (nomBat * curLimit * batString) / battType;

  if (isNaN(nomBat) && isNaN(curLimit) && isNaN(batString)) {
    alert("Please enter a valid number.");
    return;
  }

  const totalAmpsEl = tab.querySelector("span.tot_amps");
  if (!totalAmpsEl) return;

  totalAmpsEl.textContent = `${totalAmps.toFixed(2)} A`;
}
// #endregion s17 =========================================================================================================

// #region s18 =========================================================================================================
function s18_fCheckUPSConfig() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;

  const upsInput = root.querySelector('input[name="mod_num_ups"]');
  const ebcInput = root.querySelector('[name="mod_num_ebc"]');
  const ebcBkdn = root.querySelector("#ebc_bkdn");

  if (upsInput && !upsInput.dataset.upsConfigBound) {
    upsInput.dataset.upsConfigBound = "true";

    upsInput.addEventListener("click", () => {
      root.querySelectorAll("table.model_desc").forEach((table) => {
        table.style.display = "none";
      });

      if (ebcBkdn) {
        ebcBkdn.innerHTML = "";
      }
    });

    upsInput.addEventListener("keyup", function () {
      const str = this.value.toUpperCase();
      fLoadUPSBreakdown(str);
    });
  }

  root.querySelectorAll("ul.model_link_ups li").forEach((li) => {
    if (li.dataset.upsLinkBound) return;

    li.dataset.upsLinkBound = "true";

    li.addEventListener("click", () => {
      const clone = li.cloneNode(true);

      clone.querySelectorAll("*").forEach((child) => child.remove());

      const str = clone.innerHTML.trim();

      if (upsInput) {
        upsInput.value = str;
      }

      fLoadUPSBreakdown(str);
    });
  });

  root.querySelectorAll("ul.model_link_ebc li").forEach((li) => {
    if (li.dataset.ebcLinkBound) return;

    li.dataset.ebcLinkBound = "true";

    li.addEventListener("click", () => {
      const clone = li.cloneNode(true);

      clone.querySelectorAll("*").forEach((child) => child.remove());

      const str = clone.innerHTML.trim();

      if (ebcInput) {
        ebcInput.value = str;
      }

      fLoadEBCBreakdown(str, ebcBkdn);
    });
  });

  if (ebcInput && !ebcInput.dataset.ebcInputBound) {
    ebcInput.dataset.ebcInputBound = "true";

    ebcInput.addEventListener("keyup", function () {
      const str = this.value.toUpperCase();
      fLoadEBCBreakdown(str, ebcBkdn);
    });
  }
}

function fLoadUPSBreakdown(str) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;

  const tables = root.querySelectorAll("table.model_desc");

  const oUPS = gxt5UpsData.ups.find((item) => {
    return str.indexOf(item.model) === 0;
  });

  if (oUPS) {
    const setHTML = (selector, value) => {
      const el = root.querySelector(selector);

      if (!el) return;

      el.innerHTML = value || "";
    };

    setHTML("#rating", oUPS.rating);
    setHTML("#voltage", oUPS.voltage);
    setHTML("#wiring", oUPS.wiring);
    setHTML("#dimen", oUPS.dimension);
    setHTML("#snmp", oUPS.is_option);

    fCheckEBCModel(str);

    tables.forEach((table) => {
      table.style.display = "table";
    });
  } else {
    tables.forEach((table) => {
      table.style.display = "none";
    });
  }
}

function fCheckEBCModel(str) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;

  const ebcData = gxt5UpsData.ebc.find((item) => {
    return item.upsmodels.some((model) => {
      return str.indexOf(model) === 0;
    });
  });

  const sEBC = ebcData?.model;

  const ebc = root.querySelector("#ebc");
  const ebcBkdn = root.querySelector("#ebc_bkdn");
  const ebcInput = root.querySelector('input[name="mod_num_ebc"]');

  if (sEBC) {
    if (ebc) {
      ebc.textContent = `Yes (${sEBC})`;
    }

    fLoadEBCBreakdown(sEBC, ebcBkdn);

    if (ebcInput) {
      ebcInput.value = sEBC;
    }
  } else {
    if (ebc) {
      ebc.innerHTML = "<em>Not available for this model.</em>";
    }

    if (ebcBkdn) {
      ebcBkdn.innerHTML = "";
    }
  }
}

function fLoadEBCBreakdown(str, oTarg) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot || !oTarg) return;

  const root = host.shadowRoot;

  oTarg.innerHTML = "";

  const header = document.createElement("h4");
  header.textContent = str;
  oTarg.appendChild(header);

  const table = document.createElement("table");
  table.className = "model_desc";
  oTarg.appendChild(table);

  const rows = [];

  for (let i = 0; i < 3; i++) {
    const tr = document.createElement("tr");
    table.appendChild(tr);
    rows.push(tr);
  }

  const strIndTower = str.indexOf("RT");

  // Rating
  const rate = str.indexOf("GXT5") !== -1 ? str.substring(8, strIndTower).toUpperCase() : str.substring(4, strIndTower).toUpperCase();

  const ratingTh = document.createElement("th");
  ratingTh.textContent = "Rating";
  rows[0].appendChild(ratingTh);

  const ratingTd = document.createElement("td");
  ratingTd.id = "ebc_rating";
  rows[0].appendChild(ratingTd);

  fCheckEBCVoltage(rate);

  // Dimensions
  const dimen = parseFloat(str.substring(strIndTower + 2, str.length));

  const dimenTh = document.createElement("th");
  dimenTh.textContent = "Dimensions";
  rows[1].appendChild(dimenTh);

  const dimenTd = document.createElement("td");
  dimenTd.id = "ebc_dimen";
  rows[1].appendChild(dimenTd);

  const sDimen = !isNaN(dimen) ? `${dimen}U (${(dimen * 1.75).toFixed(2)}in, ${(dimen * 44.45).toFixed(2)}mm)` : "--";

  dimenTd.textContent = sDimen;

  // Configuration
  const configTh = document.createElement("th");
  configTh.textContent = "Configuration";
  rows[2].appendChild(configTh);

  const configTd = document.createElement("td");
  configTd.textContent = "Rack or Tower";
  rows[2].appendChild(configTd);

  function fCheckEBCVoltage(rate) {
    let sRate;

    switch (rate) {
      case "36V":
        sRate = "36 Volts, 2 Strings (3 jars per string)";
        break;
      case "48V":
        sRate = "48 Volts, 2 Strings (4 jars per string)";
        break;
      case "72V":
        sRate = "72 Volts, 2 Strings (6 jars per string)";
        break;
      case "144V":
        sRate = "144 Volts, 1 String (12 jars per string)";
        break;
      case "192V":
        sRate = "192 Volts, 1 String (16 jars per string)";
        break;
      case "240V":
        sRate = "240 Volts, 1 String (20 jars per string)";
        break;
      case "288V":
        sRate = "288 Volts, 1 String (24 jars per string)";
        break;
      case "384V":
        sRate = "384 Volts, 1 String (32 jars per string)";
        break;
      case "LI-48V":
        sRate = "51.2 Volts, 3 Strings";
        break;
      case "LI-192V":
        sRate = "192 Volts, 1 String (1/2 String for 8-10K MV)";
        break;
      default:
        oTarg.innerHTML = "";
        return;
    }

    const rating = root.querySelector("#ebc_rating");

    if (rating) {
      rating.textContent = sRate;
    }
  }

  table.style.display = "table";
}
// #endregion s18 =========================================================================================================

// #region z03 =========================================================================================================
function z03_fCalcTestpoint1(tabID, factor) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;
  const table = root.querySelector(`table#${tabID}`);
  if (!table) return;

  const line_ab = parseFloat(table.querySelector('input[name="line_ab"]')?.value);
  const line_bc = parseFloat(table.querySelector('input[name="line_bc"]')?.value);
  const line_ca = parseFloat(table.querySelector('input[name="line_ca"]')?.value);
  const vNom = parseFloat(table.querySelector('input[name="sts_nom"]')?.value);
  const intpNom = parseFloat(table.querySelector('input[name="in_tp"]')?.value);

  const vAve = (line_ab + line_bc + line_ca) / 3;
  const cVal = vAve / vNom;
  const tp_val = cVal * factor * intpNom;

  if (isNaN(tp_val)) {
    alert("Please provide complete details.");
  } else {
    const outSpan = table.querySelector("span.out_tp");
    if (outSpan) {
      outSpan.textContent = `${tp_val.toFixed(2)} VDC`;
    }
  }
}

function z03_fCalcTestpoint2(tabID, factor) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;
  const table = root.querySelector(`table#${tabID}`);
  if (!table) return;

  const intpNom = parseFloat(table.querySelector('input[name="in_tp"]')?.value);
  const tp_val = factor * intpNom;

  if (isNaN(tp_val)) {
    alert("Please provide complete details.");
  } else {
    const outSpan = table.querySelector("span.out_tp");
    if (outSpan) {
      outSpan.textContent = `${tp_val.toFixed(2)} VDC`;
    }
  }
}
// #endregion z03 =========================================================================================================

// #region z08 =========================================================================================================
function fTabProcs(root) {
  if (!root) return;

  const tabPr = root.querySelector(".tab-proc tr")?.children;
  if (!tabPr) return;

  const isTwoCols = tabPr.length === 2;

  Array.from(tabPr).forEach((td) => {
    td.removeAttribute("align"); // remove old inline align
    td.setAttribute("valign", "top"); // keep valign

    td.classList.add("tab-cell"); // add base styles

    if (isTwoCols) {
      td.classList.add("half");
    } else {
      td.classList.add("dynamic");
    }
  });
}
function z08_CalculateOVUV() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const inputs = root.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";

    input.addEventListener("keyup", function () {
      const ol = this.closest("ol");
      if (!ol) return;

      const olID = ol.getAttribute("id");
      if (!olID) return;

      const uv = root.querySelector("#" + olID + " input[name=uv]");
      const ov = root.querySelector("#" + olID + " input[name=ov]");

      if (isNaN(this.value)) {
        alert("Please enter a number.");
        this.value = "";
      } else {
        const AB = parseFloat(root.querySelector("#" + olID + " input[name=PhaseAB]")?.value);
        const BC = parseFloat(root.querySelector("#" + olID + " input[name=PhaseBC]")?.value);
        const CA = parseFloat(root.querySelector("#" + olID + " input[name=PhaseCA]")?.value);
        const NV = parseFloat(root.querySelector("#" + olID + " input[name=Nominal]")?.value);
        const Ref = parseFloat(root.querySelector("#" + olID + " input[name=Ref]")?.value);

        const Avg = (AB + BC + CA) / 3;
        const Factor = Avg / NV;

        const OV = Factor * 0.9 * Ref;
        const UV = Factor * 1.1 * Ref;

        if (isNaN(OV) && isNaN(UV)) {
          if (uv) uv.value = "";
          if (ov) ov.value = "";
        } else {
          if (uv) uv.value = UV.toFixed(2);
          if (ov) ov.value = OV.toFixed(2);
        }
      }
    });
  });
}

// #endregion z08 =========================================================================================================

// #region z09 =========================================================================================================
function z09_fSetFormAction() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const form = root.querySelector("form[id=x3514_form]");
  if (!form) return;

  // Idempotence marker
  if (form.hasAttribute("data-init-mailto")) return;

  // SAFE action – prevents mixed-content warning
  form.setAttribute("action", "javascript:void(0)");

  // Store email template in a proper data attribute (instead of action)
  form.setAttribute("data-mailto-template", "mailto:LSTechSupport@vertiv.com?subject=Safety FCN X 3514 (Ticket #Ticket No.#)");

  // Mark as initialized
  form.setAttribute("data-init-mailto", "1");
}

function z09_fAddBreakerStatus() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const breakerRows = root.querySelectorAll(".breaker_status");
  if (breakerRows.length === 0) return;

  const ind = breakerRows.length + 1;
  const templateRow = breakerRows[0];
  const newRow = templateRow.cloneNode(true);

  // Update input (serial)
  const serialInput = newRow.querySelector("input");
  if (serialInput) {
    serialInput.title = `Breaker ${ind} Serial No.`;
    serialInput.name = `breaker_serial${ind}`;
    serialInput.value = "";
  }

  // Update select (status)
  const statusSelect = newRow.querySelector("select");
  if (statusSelect) {
    statusSelect.title = `Breaker ${ind} Status`;
    statusSelect.name = `breaker_status${ind}`;
    statusSelect.value = "";
  }

  // ---- Add delete button once per cloned row ----
  if (!newRow.hasAttribute("data-has-delete")) {
    const td = document.createElement("td");
    td.innerHTML = "<input style='width:20px' type='button' value='&times;'>";
    td.style.backgroundColor = "white";

    const btn = td.querySelector("input");
    const key = "data-init-click";
    if (!btn.hasAttribute(key)) {
      btn.addEventListener("click", () => {
        const tr = btn.closest("tr");
        if (tr) tr.remove();
      });
      btn.setAttribute(key, "1");
    }

    newRow.appendChild(td);
    newRow.setAttribute("data-has-delete", "1");
  }

  // Insert before the add-breaker trigger row
  const addBreakerRow = root.querySelector("#add_breaker");
  if (addBreakerRow) {
    addBreakerRow.parentNode.insertBefore(newRow, addBreakerRow);
  }
}
// #endregion z09 =========================================================================================================

// #region z10 =========================================================================================================
function z10_fShowTable(oID) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const divAttributeStorage = root.querySelector("#custom-article-div");

  let prevRef = divAttributeStorage.getAttribute("data-active-button");
  if (!prevRef) return;

  // NORMAL FLOW
  if (prevRef !== oID) {
    const prevdivID = prevRef.replace("_but", "");
    const prevdiv = root.querySelector(`#${prevdivID}`);
    const prevButton = root.querySelector(`#${prevRef}`);

    if (prevdiv) prevdiv.style.display = "none";
    if (prevButton) prevButton.disabled = false;
  }

  const divID = oID.replace("_but", "");
  const div = root.querySelector(`#${divID}`);
  const button = root.querySelector(`#${oID}`);

  if (div) div.style.display = "";
  if (button) button.disabled = true;

  divAttributeStorage.setAttribute("data-active-button", oID);
}

function z10_fImgTemp() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  // Helper: add event once to element using data attribute
  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  // --- Create quick-box-a if not already present ---
  /*  if (!root.querySelector(".quick-box-a")) {
    const qbA = document.createElement("div");
    qbA.className = "quick-box-a";
    root.appendChild(qbA);
  } */

  // --- Set position relative to hotspot_med parent divs ---
  root.querySelectorAll(".hotspot_med").forEach((el) => {
    const parentDiv = el.closest("div");
    if (parentDiv) parentDiv.style.position = "relative";
  });

  // --- Hide all children divs of temp-div ---
  root.querySelectorAll(".temp-div > div").forEach((el) => (el.style.display = "none"));

  // --- Set td background color to white ---
  root.querySelectorAll(".temp-div td").forEach((el) => (el.style.backgroundColor = "white"));

  // --- Add Reference label and icon-index div ---
  if (!root.querySelector(".quick-box .label")) {
    const labelRef = document.createElement("div");
    labelRef.className = "label";
    labelRef.textContent = "Reference:";
    const quickBox = root.querySelector(".quick-box");
    if (quickBox) {
      quickBox.prepend(labelRef);

      const iconDiv = document.createElement("div");
      iconDiv.className = "icon-index";
      labelRef.insertAdjacentElement("afterend", iconDiv);
    }
  }

  // --- Add Quick Link label ---
  /*   if (!root.querySelector(".quick-box-a .label")) {
    const qbA = root.querySelector(".quick-box-a");
    if (qbA) {
      const labelQuick = document.createElement("div");
      labelQuick.className = "label";
      labelQuick.textContent = "Quick Link:";
      qbA.appendChild(labelQuick);

      const iconDiv = document.createElement("div");
      iconDiv.className = "icon-index";
      iconDiv.innerHTML = 'Troubleshooting &rarr; <a href="z1093400.htm">Thermal Sensors and Over-Temp Sensing</a>';
      qbA.appendChild(iconDiv);
    }
  } */

  // --- Convert temp-index links to buttons ---
  root.querySelectorAll("#temp-index div a").forEach((aEl) => {
    const href = aEl.getAttribute("href");
    const aText = aEl.textContent;

    const btn = document.createElement("input");
    btn.type = "button";
    btn.value = aText;
    btn.className = "selector-button";

    addEventOnce(btn, "click", () => {
      const dTarg = Array.from(root.querySelectorAll(".temp-div > div")).filter((d) => d.matches(href));
      const dHide = Array.from(root.querySelectorAll(".temp-div > div")).filter((d) => !d.matches(href));

      dHide.forEach((el) => {
        el.style.transition = "opacity 0.1s";
        el.style.opacity = 0;
        setTimeout(() => (el.style.display = "none"), 100);
      });

      dTarg.forEach((el) => {
        setTimeout(() => {
          el.style.display = "block";
          el.style.transition = "opacity 1s";
          el.style.opacity = 1;
        }, 100);
      });
    });

    const tempIndex = root.querySelector("#temp-index");
    if (tempIndex) tempIndex.insertAdjacentElement("afterend", btn);
  });

  // --- Hotspot click handling ---
  root.querySelectorAll(".hotspot_med").forEach((el) => {
    const id = el.getAttribute("data-id");

    addEventOnce(el, "click", () => {
      root.querySelectorAll(".temp-div > div").forEach((d) => {
        const show = d.id === id;

        if (show) {
          setTimeout(() => {
            d.style.display = "block";
            d.style.transition = "opacity 1s";
            d.style.opacity = 1;
          }, 100);
        } else {
          d.style.transition = "opacity 0.1s";
          d.style.opacity = 0;
          setTimeout(() => (d.style.display = "none"), 100);
        }
      });
    });
  });

  // --- Remove temp-index element ---
  const tempIndexEl = root.querySelector("#temp-index");
  if (tempIndexEl) tempIndexEl.remove();

  // --- Update quick-box-a to quick-box ---
  /*  const qbAEl = root.querySelector(".quick-box-a");
  if (qbAEl) {
    qbAEl.className = "quick-box";
  } */
}

function z10_fCustomWinSvtNvRam() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const toggles = root.querySelectorAll('input[name^="chn"][name$="-toggle"], input[name^="ch2"][name$="-toggle"]');

  toggles.forEach((toggle) => {
    if (toggle.dataset.listenerAttached) return;
    toggle.dataset.listenerAttached = "true";

    const handler = (e) => {
      const name = e.target.name; // ← use event target
      const checked = root.querySelector(`input[name="${name}"]:checked`);
      const show = checked && checked.value === "custom";

      const textInput = root.querySelector(`input[name="${name}-text"]`);
      if (textInput) {
        textInput.style.display = show ? "inline" : "none";
      }
    };

    toggle.addEventListener("click", handler);

    if (toggle.checked) handler({ target: toggle });
  });
}

function z10_fClearNXLForm() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const bErase = confirm("Do you really want to clear all data from this form?\t");
  if (!bErase) return;

  const form = root.querySelector("div.stored-form");
  if (!form) return;

  // Load stored_form from localStorage
  let storedForm = {};
  try {
    storedForm = JSON.parse(localStorage.getItem("stored_form")) || {};
  } catch (e) {
    storedForm = {};
  }

  const clearElement = (el, bg) => {
    el.value = "";
    el.style.background = bg;
    if (el.name && storedForm.hasOwnProperty(el.name)) {
      delete storedForm[el.name]; // remove key from stored_form
    }
  };

  // Clear inputs / textareas / files
  form.querySelectorAll('input[type="text"], input[type="file"], textarea').forEach((el) => clearElement(el, "#ffffff"));

  // Clear selects
  form.querySelectorAll("select").forEach((el) => clearElement(el, "inherit"));

  // Clear radios
  form.querySelectorAll('input[type="radio"]').forEach((el) => clearElement(el, "inherit"));

  // Clear toggle radio labels
  form.querySelectorAll('input[type="radio"][name$="-toggle"]').forEach((el) => {
    const label = form.querySelector(`label[for="${el.id}"]`);
    if (label) label.className = "";
  });

  // Save updated stored_form back to localStorage
  localStorage.setItem("stored_form", JSON.stringify(storedForm));

  // location.reload();
}
// #endregion z10 =========================================================================================================

// #region z23 =========================================================================================================
function z23_updateModelList(param) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  let arr = [{ val: 0, text: "" }];
  switch (param) {
    case "KVA225":
      arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS12620MR", text: "UPS12-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "UPS31HR5000", text: "31HR5000" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "UPSDEKAHR4000", text: "HR4000" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "HX330FR", text: "HX330-FR" },
        { val: "HX400", text: "HX400" },
        { val: "ENERSYSHX505", text: "HX505" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;

    case "KVA250":
      arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "HX300FR", text: "HX300-FR" },
        { val: "HX330FR", text: "HX330-FR" },
        { val: "HX400FR", text: "HX400-FR" },
        { val: "HX505FR", text: "HX505-FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS6620MR", text: "UPS6-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;

    case "KVA300":
      arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "HX300FR", text: "HX300-FR" },
        { val: "HX330FR", text: "HX330-FR" },
        { val: "HX400FR", text: "HX400-FR" },
        { val: "HX505FR", text: "HX505-FR" },
        { val: "HX540FR", text: "HX540-FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS6620MR", text: "UPS6-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "UPS31HR5000", text: "31HR5000" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "HR4000ET", text: "HR4000ET" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;

    case "KVA400":
      arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "HX300FR", text: "HX300-FR" },
        { val: "HX330FR", text: "HX330-FR" },
        { val: "HX400FR", text: "HX400-FR" },
        { val: "HX505FR", text: "HX505-FR" },
        { val: "HX540FR", text: "HX540-FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS6620MR", text: "UPS6-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;

    case "KVA500":
      arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "3AVR9523FR", text: "3AVR95-23FR" },
        { val: "HX300FR", text: "HX300-FR" },
        { val: "HX330FR", text: "HX330-FR" },
        { val: "HX400FR", text: "HX400-FR" },
        { val: "HX505FR", text: "HX505-FR" },
        { val: "HX540FR", text: "HX540-FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS6620MR", text: "UPS6-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;

    case "KVA600":
      arr = [
        { val: 0, text: "" },
        { val: "16HX550FR", text: "16HX550FR" },
        { val: "16HX800FR", text: "16HX800FR" },
        { val: "16HX925FR", text: "16HX925FR" },
        { val: "HX300FR", text: "HX300-FR" },
        { val: "HX330FR", text: "HX330-FR" },
        { val: "HX400FR", text: "HX400-FR" },
        { val: "HX505FR", text: "HX505-FR" },
        { val: "HX540FR", text: "HX540-FR" },
        { val: "UPS12300MR", text: "UPS12-300MR" },
        { val: "UPS12350MR", text: "UPS12-350MR" },
        { val: "UPS12400MR", text: "UPS12-400MR" },
        { val: "UPS12490MR", text: "UPS12-490MR" },
        { val: "UPS12540MR", text: "UPS12-540MR" },
        { val: "UPS6620MR", text: "UPS6-620MR" },
        { val: "4DHR6500", text: "4DHR6500" },
        { val: "HR3500ET", text: "HR3500ET" },
        { val: "HR5500ET", text: "HR5500ET" },
        { val: "HR7500ET", text: "HR7500ET" },
        { val: "S12V300FR", text: "S12V300FR" },
        { val: "S12V370FR", text: "S12V370FR" },
        { val: "S12V500FR", text: "S12V500FR" },
        { val: "S6V740FR", text: "S6V740FR" },
      ];
      break;
    default:
      arr = [{ val: 0, text: "" }];
  }

  // Update the model dropdown
  z23_updateList("#batModelNum", arr, "initModel");

  // Reset string dropdown
  z23_updateList("#batStringCnt", [{ val: 0, text: "" }], "initString");

  // Update state
  root.querySelector("#custom-article-div").dataset.upsSize = param;

  // Display the correct table
  z23_displayTable();

  const batModelNum = root.querySelector("#batModelNum");
  if (batModelNum && !batModelNum.dataset.listenerInit) {
    batModelNum.addEventListener("change", (event) => {
      const param = event.target.value;

      const items =
        param == 0
          ? [{ val: 0, text: "" }]
          : [
              { val: 0, text: "" },
              { val: 1, text: "1 String" },
              { val: 2, text: "2 String" },
              { val: 3, text: "3 String" },
              { val: 4, text: "4 String" },
            ];

      // Reset the string dropdown to allow re-initialization
      const batStringCnt = root.querySelector("#batStringCnt");
      batStringCnt?.removeAttribute("data-init-string");

      // Update the string dropdown
      z23_updateList("#batStringCnt", items, "initString");

      // Update state
      const customDiv = root.querySelector("#custom-article-div");
      if (customDiv) {
        customDiv.dataset.modelNum = param;
        customDiv.dataset.stringCnt = "";
      }

      // Refresh table display
      z23_displayTable();
    });

    batModelNum.dataset.listenerInit = "1";
  }

  // -------------------------
  // String dropdown change
  // -------------------------
  const batStringCnt = root.querySelector("#batStringCnt");
  if (batStringCnt && !batStringCnt.dataset.listenerInit) {
    batStringCnt.addEventListener("change", (event) => {
      const param = event.target.value;

      const customDiv = root.querySelector("#custom-article-div");
      if (customDiv) {
        customDiv.dataset.stringCnt = param;
      }

      // Refresh table display
      z23_displayTable();
    });

    batStringCnt.dataset.listenerInit = "1";
  }
}

// Helper: update <select> options once
function z23_updateList(selector, items, initKey) {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const el = root.querySelector(selector);
  if (!el) return;

  if (!el.dataset[initKey]) {
    el.innerHTML = "";
    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.val;
      option.textContent = item.text;
      el.appendChild(option);
    });
    el.dataset[initKey] = "1";
  }
}

// Helper: display the correct table
function z23_displayTable() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  let upsSize = root.querySelector("#custom-article-div").dataset.upsSize || "";
  let modelNum = root.querySelector("#custom-article-div").dataset.modelNum || "";
  let stringCnt = root.querySelector("#custom-article-div").dataset.stringCnt || "";
  let prevTable = root.querySelector("#custom-article-div").dataset.prevTable || "";

  const tableId = upsSize === "" || modelNum === "" || stringCnt === "" || stringCnt == 0 ? "emptySettings" : upsSize + modelNum + stringCnt;

  if (prevTable && prevTable !== tableId) {
    const prevEl = root.querySelector(`#${prevTable}`);
    if (prevEl) prevEl.style.display = "none";
  }

  const curEl = root.querySelector(`#${tableId}`);
  if (curEl) curEl.style.display = "";

  root.querySelector("#custom-article-div").dataset.prevTable = tableId;
}

// new
function z23_ResetButton(divId) {
  z23_fClearSelect();
  z23_fLibClearTab(divId);
}

function z23_fClearSelect() {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  root.querySelectorAll("select").forEach((sel) => {
    sel.selectedIndex = 0;
  });
}

function z23_fLibClearTab(divId) {
  if (!divId) return;

  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;
  const table = root.querySelector(`${divId} table`);
  if (!table) return;

  table.querySelectorAll("tr").forEach((tr) => {
    tr.querySelectorAll("td:not(:first-child)").forEach((td) => {
      td.textContent = "";
    });
  });
}

function z23_fCreateLibSetTable(oSetting, divId) {
  if (!divId) return;

  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;
  const table = root.querySelector(`${divId} table`);
  if (!table) return;

  if (!oSetting) {
    z23_fLibClearTab(divId);
    return;
  }

  const cells = table.querySelectorAll("td");
  if (cells.length < 24) return;

  // Fill pnu510
  oSetting.pnu510.forEach((val, i) => {
    const cell = cells[1 + i * 4];
    if (cell) cell.textContent = val;
  });

  // Fill pnu511
  oSetting.pnu511.forEach((val, i) => {
    const cell = cells[2 + i * 4];
    if (cell) cell.textContent = val;
  });

  // Fill pnu513
  oSetting.pnu513.forEach((val, i) => {
    const cell = cells[3 + i * 4];
    if (cell) cell.textContent = val;
  });
}

function z23_fCreatePNU530Tab(strNum, arr) {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  const tab = root.querySelector("#lib_pnu530 table");
  if (!tab) return;

  const cells = tab.querySelectorAll("td");
  cells[0].textContent = strNum;
  cells[1].textContent = arr[parseInt(strNum, 10) - 1];
}

function z23_fLoadSamLibCalc() {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  z23_fClearSelect();

  const pnu530 = [220, 440, 660, 880, 1100, 1320, 1540, 1760, 1980];
  const divId = "#lib_setting";

  root.querySelectorAll("select").forEach((sel) => {
    sel.removeEventListener("change", handleChange);
    sel.addEventListener("change", handleChange);
  });

  function handleChange() {
    const sRating = root.querySelector("select[name=rating]")?.value;
    const sPnu605 = root.querySelector("select[name=pnu605]")?.value;
    const sCellNum = root.querySelector("select[name=cellnum]")?.value;
    const sStringNum = root.querySelector("select[name=stringnum]")?.value;

    if (sRating && sPnu605 && sCellNum && sStringNum) {
      const oSetting = z23SamBattSettings.find(
        (st) => st.rating === sRating && st.pnu605 === sPnu605 && st.cellnum === sCellNum && st.stringnum === sStringNum
      );

      z23_fCreateLibSetTable(oSetting, divId);
      z23_fCreatePNU530Tab(sStringNum, pnu530);
    } else {
      z23_fLibClearTab(divId);
    }
  }
}

function z23_fLoadHPLLibCalc() {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  z23_fClearSelect();

  const divId = "#lib_setting";
  const pnu530 = [300, 500, 700, 800, 900, 1000, 1100, 1200, 1200];

  root.querySelectorAll("select").forEach((sel) => {
    sel.removeEventListener("change", handleChange);
    sel.addEventListener("change", handleChange);
  });

  function handleChange() {
    const sRating = root.querySelector("select[name=rating]")?.value;
    const sPnu605 = root.querySelector("select[name=pnu605]")?.value;
    const sCelTemp = root.querySelector("select[name=celtemp]")?.value;
    const sStringNum = root.querySelector("select[name=stringnum]")?.value;

    if (sRating && sPnu605 && sCelTemp && sStringNum) {
      const oSetting = z23HplBattSettings.find(
        (st) => st.rating === sRating && st.pnu605 === sPnu605 && st.celtemp === sCelTemp && st.cellnum === "132" && st.stringnum === sStringNum
      );

      z23_fCreateLibSetTable(oSetting, divId);
      z23_fCreatePNU530Tab(sStringNum, pnu530);
    } else {
      z23_fLibClearTab(divId);
    }
  }
}
// #endregion z23 =========================================================================================================

// #region z24 =========================================================================================================
function z24_fImgTemp() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;

  const hotSpots = root.querySelectorAll("#temp-map span");
  const hotLinks = root.querySelectorAll(".hotspot-link");
  const allTempDivChildren = root.querySelectorAll(".temp-div > div");

  // Apply initial styling (this is idempotent by nature)
  hotSpots.forEach((hotSpot) => {
    Object.assign(hotSpot.style, {
      position: "absolute",
      background: "#204060",
      opacity: 0.3,
    });

    const parentDiv = hotSpot.closest("div");
    if (parentDiv) parentDiv.style.position = "relative";

    // Bind events only once
    if (!hotSpot.dataset.bound) {
      hotSpot.dataset.bound = "true"; // mark as initialized

      hotSpot.addEventListener("mouseover", () => {
        hotSpot.style.opacity = 0.15;
      });

      hotSpot.addEventListener("mouseout", () => {
        hotSpot.style.opacity = 0.3;
      });

      hotSpot.addEventListener("click", (event) => {
        event.preventDefault();
        z24_handleHotspotSelection(hotSpot, root);
      });
    }
  });

  root.querySelectorAll(".temp-div td").forEach((td) => (td.style.backgroundColor = "white"));

  root.querySelectorAll("#led_seven_tab td").forEach((td) => (td.style.backgroundColor = "#eeeeee"));

  // Hide all .temp-div > div on first run or re-run
  allTempDivChildren.forEach((div) => (div.style.display = "none"));

  // Bind .hotspot-link click events once
  hotLinks.forEach((hotLink) => {
    if (!hotLink.dataset.bound) {
      hotLink.dataset.bound = "true";
      hotLink.addEventListener("click", (event) => {
        event.preventDefault();
        z24_handleHotspotLink(event.target, root);
      });
    }
  });
}

// shared logic (keeps main function clean)
function z24_handleHotspotSelection(hotSpot, root) {
  const id = hotSpot.id;
  const targetDiv = root.querySelector(`.temp-div > div#${id}`);
  const allTempDivChildren = root.querySelectorAll(".temp-div > div");
  const hotSpots = root.querySelectorAll("#temp-map span");

  hotSpots.forEach((h) => (h.style.background = "#204060"));

  if (targetDiv.style.display === "block") {
    targetDiv.style.display = "none";
    hotSpot.style.background = "#204060";
  } else {
    allTempDivChildren.forEach((div) => (div.style.display = "none"));
    hotSpot.style.background = "red";
    targetDiv.style.display = "block";
  }
}

function z24_handleHotspotLink(link, root) {
  const id = link.id;
  const targetDiv = root.querySelector(`.temp-div > div#${id}`);
  const allTempDivChildren = root.querySelectorAll(".temp-div > div");
  const hotSpots = root.querySelectorAll("#temp-map span");

  const matchingHotSpot = Array.from(hotSpots).find((h) => h.id === id);

  hotSpots.forEach((h) => (h.style.background = "#204060"));

  if (targetDiv.style.display === "block") {
    targetDiv.style.display = "none";
    matchingHotSpot.style.background = "#204060";
  } else {
    allTempDivChildren.forEach((div) => (div.style.display = "none"));
    matchingHotSpot.style.background = "red";
    targetDiv.style.display = "block";
  }
}

function z24_fLoadItemLoc() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;

  // Select spans whose class starts with "pwa"
  const buttons = root.querySelectorAll("span[class^='pwa']");

  buttons.forEach((button) => {
    // Apply base style (idempotent)
    Object.assign(button.style, {
      cursor: "pointer",
      padding: "0px 2px",
      fontWeight: "bold",
      borderBottom: "1px dotted #204060",
      color: "#204060",
    });

    // Bind hover and click once
    if (!button.dataset.bound) {
      button.dataset.bound = "true";

      button.addEventListener("mouseover", () => {
        button.style.color = "#c8a040";
      });

      button.addEventListener("mouseout", () => {
        button.style.color = "#204060";
      });

      button.addEventListener("click", () => {
        const className = button.className; // Ex: "pwa_50_100_20_30"
        const str = className.split("_"); // ["pwa", "50", "100", "20", "30"]

        // Create modal background container
        const modalCanvas = fCreateModalBackground(1);

        const divContainer = document.createElement("div");
        divContainer.style.position = "relative";

        // Clone reference element
        const refPwaClone = root.querySelector("#ref-pwa").cloneNode(true);
        refPwaClone.removeAttribute("style");
        refPwaClone.style.maxWidth = "100%";
        refPwaClone.style.maxHeight = "100%";

        const imgWidth = root.querySelector("#ref-pwa").naturalWidth;
        const imgHeight = root.querySelector("#ref-pwa").naturalHeight;

        // Create overlay for highlight box
        const overlay = document.createElement("div");
        Object.assign(overlay.style, {
          position: "absolute",
          border: "3px solid red",
          height: `${(parseInt(str[3]) / imgHeight) * 100}%`,
          width: `${(parseInt(str[4]) / imgWidth) * 100}%`,
          top: `${(parseInt(str[1]) / imgHeight) * 100}%`,
          left: `${(parseInt(str[2]) / imgWidth) * 100}%`,
        });

        divContainer.appendChild(overlay);
        divContainer.appendChild(refPwaClone);

        fStyleModalLoader(divContainer, modalCanvas);
      });
    }
  });
}

function z24_fCalcDCCurrLim() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  // Prevent re-initializing this module inside this shadowRoot
  if (root.querySelector("[data-dcc-initialized='1']")) return;

  // Mark initialization inside shadowRoot
  const initMarker = document.createElement("div");
  initMarker.style.display = "none";
  initMarker.setAttribute("data-dcc-initialized", "1");
  root.appendChild(initMarker);

  // Elements
  const els = {
    numcell: root.querySelector("#numcell"),
    vpcell: root.querySelector("#vpcell"),
    dcFloat: root.querySelector("#dc-float"),
    eodCurrLim: root.querySelector("#eod-curr-lim"),
    curperc: root.querySelector("#curperc"),
    currLimVal: root.querySelector("#curr-lim-val"),
    kvaSel: root.querySelector("select[name=kva_rating]"),
  };

  // Utility
  const val = (el) => parseFloat(el.value);

  function clearError(td) {
    const next = td.nextElementSibling;
    if (next && next.dataset.err === "1") next.remove();
  }

  function insertError(td, msg) {
    clearError(td);
    const err = document.createElement("td");
    err.dataset.err = "1";
    err.textContent = msg;
    err.style.backgroundColor = "white";
    err.style.fontSize = "80%";
    err.style.fontStyle = "italic";
    td.insertAdjacentElement("afterend", err);
  }

  function updateFloat() {
    const vfloat = val(els.numcell) * val(els.vpcell);
    if (!isNaN(vfloat)) els.dcFloat.innerHTML = vfloat + " VDC";
    return vfloat;
  }

  function updateCurrLim(vfloat) {
    const rating = parseInt(els.kvaSel.value);
    const dccurrlim = (rating * 1000) / vfloat;

    if (!isNaN(dccurrlim)) {
      els.eodCurrLim.innerHTML = dccurrlim.toFixed(2) + " ADC";
      els.eodCurrLim.style.fontWeight = "bold";
    } else {
      els.eodCurrLim.innerHTML = "";
    }
  }

  function resetPerc() {
    els.curperc.value = "";
    els.currLimVal.innerHTML = "";
  }

  function calculateAll() {
    const vfloat = updateFloat();
    updateCurrLim(vfloat);
    resetPerc();
  }

  // Utility to ensure events bind only once (using data attribute)
  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;

    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  // focusin clear logic
  [els.numcell, els.vpcell].forEach((el) => {
    addEventOnce(el, "focusin", () => {
      els.dcFloat.innerHTML = "";
      els.eodCurrLim.innerHTML = "";
      resetPerc();
      el.value = "";
    });
  });

  // kva rating click
  addEventOnce(els.kvaSel, "click", () => calculateAll());

  // number validation on numcell / vpcell
  function validateNumInputs(el) {
    const td = el.closest("td");
    if (!td) return;

    if (isNaN(el.value)) {
      insertError(td, "Please insert a number.");
      els.dcFloat.innerHTML = "";
      els.eodCurrLim.innerHTML = "";
    } else {
      clearError(td);
      calculateAll();
    }
  }

  [els.numcell, els.vpcell].forEach((el) => {
    addEventOnce(el, "keyup", () => validateNumInputs(el));
  });

  // percentage logic
  addEventOnce(els.curperc, "keyup", () => {
    const td = els.curperc.closest("td");
    clearError(td);

    const perc = val(els.curperc);
    if (isNaN(perc) || perc > 25) {
      insertError(td, "Please insert a number from 0 to 25.");
      return;
    }

    const eod = parseFloat(els.eodCurrLim.innerHTML.split(" ")[0]);
    const currlim = (eod * perc) / 100;

    if (!isNaN(currlim)) {
      els.currLimVal.innerHTML = currlim.toFixed(2) + " ADC";
      els.currLimVal.style.fontWeight = "bold";
    } else {
      els.currLimVal.innerHTML = "";
    }
  });

  // initial compute
  calculateAll();
}

function z24_fParamData() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  // --- Helpers ---
  function addEventOnce(el, event, handler) {
    const key = `data-init-${event}`;
    if (el.hasAttribute(key)) return;
    el.addEventListener(event, handler);
    el.setAttribute(key, "1");
  }

  function fadeOutElements(els, duration = 100) {
    els.forEach((el) => {
      if (el.tagName === "BR") {
        el.style.display = "none";
      } else {
        el.style.transition = `opacity ${duration}ms`;
        el.style.opacity = "0";
        setTimeout(() => (el.style.display = "none"), duration);
      }
    });
  }

  // --- Initial hiding ---
  const paramConditional = root.querySelector(".param-conditional");
  const p = paramConditional ? paramConditional.querySelector("p") : null;
  if (p) p.style.display = "none";

  const rows = root.querySelectorAll("#param-calc tr");

  const td2 = rows[0].querySelector("td:nth-child(2)");
  if (!td2) return;

  const nameEl = td2.textContent.trim() ? td2 : root.querySelector(".spo-event-name");
  if (!nameEl) return;

  td2.textContent = nameEl.textContent.substring(nameEl.textContent.indexOf(":") + 2);

  // --- Inputs and table cells ---
  const td6 = rows[2].querySelector("td:nth-child(2)"); // Enter Data No.
  const td8 = rows[3].querySelector("td:nth-child(2)"); // Hex Equivalent
  const td10 = rows[4].querySelector("td:nth-child(2)"); // Parametric Data
  if (!td6 || !td8 || !td10) return;

  let dataNum = td6.querySelector("#dataNum");
  if (!dataNum) {
    dataNum = document.createElement("input");
    dataNum.type = "text";
    dataNum.id = "dataNum";
    dataNum.maxLength = 5;
    dataNum.style.width = "100px";
    td6.appendChild(dataNum);
  }

  td8.id = "paramConv";
  const paramConv = td8;

  td10.id = "param-list";
  const paramData = td10;

  function getErrNote() {
    let el = root.querySelector("#errNote");
    if (!el) {
      el = document.createElement("td");
      el.id = "errNote";
      el.textContent = "Please insert a number.";
      el.style.backgroundColor = "white";
      el.style.fontSize = "90%";
      el.style.fontStyle = "italic";
      el.style.color = "red";
    }
    return el;
  }

  // --- Functions ---
  function fWriteParam(hex, bin) {
    const existingErr = root.querySelector("#errNote");
    if (existingErr) existingErr.remove();

    paramData.querySelectorAll("span").forEach((s) => {
      s.style.display = "none";
      s.style.opacity = "0";
    });

    const prevTD = paramConv.previousElementSibling;
    const text = prevTD ? prevTD.textContent : "";
    paramConv.textContent = text.includes("Hex") ? hex : bin;

    fLoadParam(bin);
  }

  function fLoadParam(bin) {
    const spans = paramData.querySelectorAll("span");
    for (let i = 0; i < bin.length; i++) {
      if (bin.charAt(bin.length - 1 - i) === "1") {
        const span = spans[i];
        if (span) {
          span.style.display = "block";
          span.style.opacity = "1";
        }
      }
    }
  }

  function fCreateDropdown() {
    const paramConf = rows[1];
    paramConf.style.display = "none";

    const param = root.querySelector("#param");
    if (!param) return;

    const hasDivs = param.querySelectorAll(":scope > div:not(.note)").length > 0;

    if (hasDivs) {
      paramConf.style.removeProperty("display");
      dataNum.disabled = true;

      let select = paramConf.querySelector("#config");
      if (!select) {
        const td = paramConf.querySelectorAll("td")[1];
        select = document.createElement("select");
        select.id = "config";
        select.name = "config";
        select.style.width = "104px";
        td.innerHTML = "";
        td.appendChild(select);

        const defaultOpt = document.createElement("option");
        defaultOpt.value = "";
        defaultOpt.textContent = "<-- select -->";
        select.appendChild(defaultOpt);

        param.querySelectorAll("div").forEach((div, idx) => {
          const opt = document.createElement("option");
          opt.value = idx;
          opt.textContent = div.textContent.substring(0, div.textContent.indexOf(":"));
          select.appendChild(opt);
        });
      }

      addEventOnce(select, "change", () => {
        const selected = select.value;
        paramData.innerHTML = "";
        paramConv.textContent = "";
        dataNum.value = "";

        const err = root.querySelector("#errNote");
        if (err) err.remove();

        const div = param.querySelectorAll("div")[selected];
        if (div) {
          div.querySelectorAll(":scope > p span").forEach((s) => paramData.appendChild(s.cloneNode(true)));
        }

        const spanCount = paramData.querySelectorAll("span").length;
        if (spanCount < 2 || selected === "") {
          paramData.querySelectorAll("span").forEach((s) => (s.style.display = "block"));
          paramConv.textContent = "";
          const next = paramConv.nextElementSibling;
          if (next) next.style.display = "none";
          dataNum.disabled = true;
        } else {
          dataNum.disabled = false;
        }
      });
    } else {
      paramData.innerHTML = "";
      param.querySelectorAll(":scope > p span").forEach((s) => paramData.appendChild(s.cloneNode(true)));
    }
  }

  // --- Initialize ---
  fCreateDropdown();

  addEventOnce(dataNum, "keyup", function (event) {
    const val = this.value;
    const num = parseInt(val, 10);
    const hex = !isNaN(num) ? num.toString(16) : "";
    const bin = !isNaN(num) ? num.toString(2) : "";

    if (!isNaN(num)) {
      fWriteParam(hex, bin);
      if (event.keyCode === 8 || event.keyCode === 46) {
        paramConv.textContent = "";
        fWriteParam(hex, bin);
      }
    } else {
      const err = getErrNote();
      const td = this.closest("td");
      if (td && !td.parentNode.querySelector("#errNote")) {
        td.insertAdjacentElement("afterend", err);
      }
      paramConv.textContent = "";
      fadeOutElements([...paramData.querySelectorAll("span, br")], 100);
    }
  });
}

function z24_fSetFormAction() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;
  const root = host.shadowRoot;

  const form = root.querySelector("form[id=exl_batt_close]");
  if (!form) return;

  // Idempotence marker
  if (form.hasAttribute("data-init-mailto")) return;

  // SAFE action – prevents mixed-content warning
  form.setAttribute("action", "javascript:void(0)");

  // Store email template in a proper data attribute (not action)
  form.setAttribute(
    "data-mailto-template",
    "mailto:Fred.Cowles@vertiv.com?subject=eXL - Battery Breaker Will Not Close, Site ID #Site ID#, Tag #Tag Number#, Ticket #Ticket Number#"
  );

  // Mark as initialized
  form.setAttribute("data-init-mailto", "1");
}
// #endregion z24 =========================================================================================================

// #region z25 =========================================================================================================
// Immediately called helper function to set EventListeners
function fAttachCalcCalibListeners() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;

  // Map input IDs to handler functions
  const bindings = [
    { id: "input1", handler: CalcCalib },
    { id: "input3", handler: CalcCalib2 },
    { id: "input4", handler: CalcCalib3 },
    { id: "input5", handler: CalcCalib4 },
  ];

  bindings.forEach(({ id, handler }) => {
    const input = root.getElementById(id);
    if (input && !input.dataset.listenerAttached) {
      input.addEventListener("keyup", handler);
      // Mark as wired to avoid duplicate attachment
      input.dataset.listenerAttached = "true";
    }
  });
}

function CalcCalib() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  const input = root.getElementById("input1")?.value;
  if (!input) return;

  if (isNaN(input)) {
    alert("Please enter a numerical value.");
  } else if (input > 8.3) {
    alert("Please enter a value less than 8.3.");
    root.getElementById("result2").value = "";
    root.getElementById("result1").value = "";
  } else if (input < 8.4 && input.length > 0) {
    root.getElementById("result2").value = (21.6 * input).toFixed(2);
    root.getElementById("result1").value = (3932.16 * (1000 / 60 - input) - 65536).toFixed(0);
  } else {
    root.getElementById("result2").value = "";
    root.getElementById("result1").value = "";
  }
}

function CalcCalib2() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  const input = root.getElementById("input3")?.value;
  if (!input) return;

  if (isNaN(input)) {
    alert("Please enter a numerical value.");
  } else if (input > 180) {
    alert("Please enter a value less than 180.");
    root.getElementById("result3").value = "";
  } else if (input < 181 && input.length > 0) {
    root.getElementById("result3").value = (182.045 * (360 - input) - 65536).toFixed(0);
  } else {
    root.getElementById("result3").value = "";
  }
}

function CalcCalib3() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  const input = root.getElementById("input4")?.value;
  if (!input) return;

  if (isNaN(input)) {
    alert("Please enter a numerical value.");
  } else if (input > 8.3) {
    alert("Please enter a value less than 8.3.");
    root.getElementById("result4").value = "";
    root.getElementById("result5").value = "";
  } else if (input < 8.4 && input.length > 0) {
    root.getElementById("result5").value = (21.6 * input).toFixed(2);
    root.getElementById("result4").value = (3931.16 * input).toFixed(0);
  } else {
    root.getElementById("result4").value = "";
    root.getElementById("result5").value = "";
  }
}

function CalcCalib4() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  const input = root.getElementById("input5")?.value;
  if (!input) return;

  if (isNaN(input)) {
    alert("Please enter a numerical value.");
  } else if (input > 180) {
    alert("Please enter a value less than 180.");
    root.getElementById("result6").value = "";
  } else if (input < 181 && input.length > 0) {
    root.getElementById("result6").value = (182.045 * input).toFixed(0);
  } else {
    root.getElementById("result6").value = "";
  }
}

function z25_fCalculateActivePower() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;
  const n1 = root.getElementById("num1");
  const n2 = root.getElementById("num2");
  const output = root.getElementById("output");

  if (!n1 || !n2 || !output) return;

  const val1 = parseFloat(n1.value);
  const val2 = parseFloat(n2.value);

  if (isNaN(val1) || isNaN(val2)) {
    output.innerHTML = "<strong>Invalid input</strong>";
  } else {
    output.innerHTML = `<strong>${(val1 * val2).toFixed(2)} kW</strong>`;
  }
}

function z25_clearInput() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;
  const n1 = root.getElementById("num1");
  const n2 = root.getElementById("num2");
  const output = root.getElementById("output");

  if (n1) n1.value = "";
  if (n2) n2.value = "";
  if (output) output.innerHTML = "";
}

// Reset button for z25 Calculator
function z25_ResetButton(divId) {
  fClearSelect();
  fLibClearTab(divId);
}

// Helper
function fClearSelect() {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  root.querySelectorAll("select").forEach((sel) => {
    sel.selectedIndex = 0; // reset to first option
  });
}

// Helper
function fLibClearTab(divId) {
  if (!divId) return;
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;
  const table = root.querySelector(`${divId} table`);

  table.querySelectorAll("tr").forEach((tr) => {
    tr.querySelectorAll("td:not(:first-child)").forEach((td) => {
      td.textContent = "";
    });
  });
}

// Helper
function fCreateLibSetTable(oSetting, divId) {
  if (!divId) return;

  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;
  const table = root.querySelector(`${divId} table`);

  if (!oSetting) {
    fLibClearTab(divId);
    return;
  }

  const cells = table.querySelectorAll("td");
  if (cells.length < 24) return; // safeguard

  // fill pnu1510
  oSetting.pnu1510.forEach((val, i) => {
    const cell = cells[1 + i * 4];
    if (cell) cell.textContent = val;
  });

  // fill pnu1511
  oSetting.pnu1511.forEach((val, i) => {
    const cell = cells[2 + i * 4];
    if (cell) cell.textContent = val;
  });

  // fill pnu1513
  oSetting.pnu1513.forEach((val, i) => {
    const cell = cells[3 + i * 4];
    if (cell) cell.textContent = val;
  });
}

// Helper
function fCreatePNU1530Tab(rating, strNum, arr) {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  const tab = root.querySelector("#lib_pnu1530 table");
  if (!tab) return;

  const rateArr = ["250", "300", "400", "400E", "500", "600", "625", "750", "800", "1000", "1100", "1200", "1250"];
  const p1530maxArr = [651, 781, 1042, 1042, 1302, 1563, 1628, 1953, 2083, 2604, 2865, 3125, 3255];

  const idx = rateArr.indexOf(rating);
  if (idx === -1) return;

  const p1530Max = p1530maxArr[idx];
  const baseVal = arr[parseInt(strNum, 10) - 1];
  const finalVal = Math.min(baseVal, p1530Max);

  const cells = tab.querySelectorAll("td");
  if (cells[0]) cells[0].textContent = strNum;
  if (cells[1]) cells[1].textContent = finalVal;
}

// Helper
function fUniqueArray(text, arr) {
  if (!arr.includes(text)) {
    arr.push(text);
  }
}

// Helper
function fLoadOptions(arr, sel) {
  if (!sel) return;
  sel.querySelectorAll("option:not(:first-child)").forEach((opt) => opt.remove());

  arr.forEach((val) => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    sel.appendChild(opt);
  });
}

// Immediately called function for specific article/s
function z25_fLoadSamLibCalc() {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  fClearSelect();

  const pnu1530 = [220, 440, 660, 880, 1100, 1320, 1540, 1760, 1980, 2200, 2420, 2640];
  const divId = "#lib_setting"; // table Div ID
  if (!divId) return;

  // generic change handler
  root.querySelectorAll("select").forEach((sel) => {
    // prevent duplicate listeners
    sel.removeEventListener("change", handleGenericChange);
    sel.addEventListener("change", handleGenericChange);
  });

  function handleGenericChange() {
    const sRating = root.querySelector("select[name=rating]")?.value;
    const sPnu1605 = root.querySelector("select[name=pnu1605]")?.value;
    const sCellNum = root.querySelector("select[name=cellnum]")?.value;
    const sStringNum = root.querySelector("select[name=stringnum]")?.value;

    if (sRating && sPnu1605 && sCellNum && sStringNum) {
      const oSetting = z25SamBattSettings.find(
        (st) => st.rating === sRating && st.pnu1605 === sPnu1605 && st.cellnum === sCellNum && st.stringnum === sStringNum
      );
      fCreateLibSetTable(oSetting, divId);
      fCreatePNU1530Tab(sRating, sStringNum, pnu1530);
    } else {
      fLibClearTab(divId);
    }
  }

  // rating-specific handler
  const ratingSelect = root.querySelector("select[name=rating]");
  if (ratingSelect) {
    ratingSelect.removeEventListener("change", handleRatingChange);
    ratingSelect.addEventListener("change", handleRatingChange);
  }

  function handleRatingChange() {
    const stringSelect = root.querySelector("select[name=stringnum]");
    if (!stringSelect) return;

    // clear existing options except first
    stringSelect.querySelectorAll("option:not(:first-child)").forEach((opt) => opt.remove());

    const selectedRating = ratingSelect.value;
    if (!selectedRating) return;

    const arrStr = [];
    z25SamBattSettings.filter((st) => st.rating === selectedRating).forEach((st) => fUniqueArray(st.stringnum, arrStr));
    fLoadOptions(arrStr, stringSelect);
  }
}

// Immediately called function for specific article/s
function z25_fLoadHplLibCalc() {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  fClearSelect();

  const pnu1530 = [300, 500, 700, 800, 900, 1000, 1100, 1200, 1200];
  const divId = "#lib_setting"; // table Div ID
  if (!divId) return;

  // generic change handler
  root.querySelectorAll("select").forEach((sel) => {
    // prevent duplicate listeners
    sel.removeEventListener("change", handleGenericChange);
    sel.addEventListener("change", handleGenericChange);
  });

  function handleGenericChange() {
    const sRating = root.querySelector("select[name=rating]")?.value;
    const sPnu1605 = root.querySelector("select[name=pnu1605]")?.value;
    const sCelTemp = root.querySelector("select[name=celtemp]")?.value;
    const sStringNum = root.querySelector("select[name=stringnum]")?.value;

    if (sRating && sPnu1605 && sCelTemp && sStringNum) {
      const oSetting = z25HplBattSettings.find(
        (st) => st.rating === sRating && st.pnu1605 === sPnu1605 && st.celtemp === sCelTemp && st.cellnum === "132" && st.stringnum === sStringNum
      );
      fCreateLibSetTable(oSetting, divId);
      fCreatePNU1530Tab(sRating, sStringNum, pnu1530);
    } else {
      fLibClearTab(divId);
    }
  }

  // rating-specific handler
  const ratingSelect = root.querySelector("select[name=rating]");
  if (ratingSelect) {
    ratingSelect.removeEventListener("change", handleRatingChange);
    ratingSelect.addEventListener("change", handleRatingChange);
  }

  function handleRatingChange() {
    const stringSelect = root.querySelector("select[name=stringnum]");
    if (!stringSelect) return;

    // clear existing options except first
    stringSelect.querySelectorAll("option:not(:first-child)").forEach((opt) => opt.remove());

    const selectedRating = ratingSelect.value;
    if (!selectedRating) return;

    const arrStr = [];
    z25HplBattSettings.filter((st) => st.rating === selectedRating).forEach((st) => fUniqueArray(st.stringnum, arrStr));

    fLoadOptions(arrStr, stringSelect);
  }
}

// NEW helper for PNU1530 and PNU1402
function z25_fClearPNU() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  // Always call fClearSelect first
  fClearSelect();

  // Clear result fields safely
  const pnu1530 = root.getElementById("pnu1530");
  const pnu1402 = root.getElementById("pnu1402");

  if (pnu1530) pnu1530.textContent = "";
  if (pnu1402) pnu1402.textContent = "";

  // Reset inputs
  const padcInput = root.getElementById("padc");
  const adcInput = root.getElementById("ADC");

  if (padcInput) padcInput.value = "";
  if (adcInput) {
    adcInput.value = "";
  }
}

// Immediately called function for specific article/s
function z25_fCalcPNU1530() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  fClearSelect();

  // Reset all inputs
  root.querySelectorAll("input").forEach((input) => (input.value = ""));

  const ratingSelect = root.getElementById("rating");
  const padcInput = root.getElementById("padc");
  const pnu1530Display = root.getElementById("pnu1530");

  ratingSelect?.addEventListener("change", fCalcPNU1530Val);

  padcInput?.addEventListener("keyup", () => {
    if (!isNaN(padcInput.value)) {
      fCalcPNU1530Val();
    } else {
      padcInput.value = "";
    }
  });

  function fCalcPNU1530Val() {
    if (!ratingSelect || !padcInput) return;

    const [rateStr, maxAmpStr] = ratingSelect.value.split("_");
    const rateKVA = parseInt(rateStr, 10);
    const maxAmp = parseInt(maxAmpStr, 10);
    const padcValue = parseInt(padcInput.value, 10);

    // Clear previous results
    pnu1530Display.textContent = "";

    if (padcInput.value === "") return;

    if (!isNaN(padcValue) && padcValue <= maxAmp) {
      pnu1530Display.innerHTML = `<strong>${padcValue * 10}</strong>`;
    } else if (padcValue > maxAmp) {
      alert(`The entered value must not exceed ${maxAmp} for ${rateKVA}kVA.`);
      padcInput.value = "";
    }
  }
}

// Immediately called function for specific article/s
function z25_fCalcPNU1402() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  fClearSelect();

  // Reset all inputs
  root.querySelectorAll("input").forEach((input) => (input.value = ""));

  const adcInput = root.getElementById("ADC");
  const p1530Input = root.getElementById("p1530");
  const pnu1402Display = root.getElementById("pnu1402");

  [adcInput, p1530Input].forEach((input) =>
    input?.addEventListener("keyup", () => {
      if (!adcInput || !p1530Input) return;

      pnu1402Display.textContent = "";

      const adcValue = parseInt(adcInput.value, 10);
      const p1530Value = parseInt(p1530Input.value, 10);

      if (adcInput.value !== "" && p1530Input.value !== "") {
        if (adcValue <= p1530Value) {
          const result = (adcValue * 1000) / p1530Value;
          pnu1402Display.innerHTML = `<strong>${result.toFixed(0)}</strong>`;
        } else if (adcValue > p1530Value) {
          alert(`The entered value must not exceed ${p1530Value / 10}.`);
          adcInput.value = "";
        }
      }
    })
  );
}

function z25_resetBtnECV3_16167() {
  const root = document.querySelector(".custom-article-content")?.shadowRoot;
  if (!root) return;

  root.querySelector("#pnu1402").textContent = "";
  root.querySelector("#ADC").value = "";
  root.querySelector("#p1530").value = "";
}

// Immediately called function for specific article/s to run attachVoltLockoutListener()
function fCalcVoltLockout() {
  attachVoltLockoutListener(".lock_byp_volt", ".lock_out_volt", 480);
  attachVoltLockoutListener(".lock_byp_volt2", ".lock_out_volt2", 208);
  attachVoltLockoutListener(".lock_byp_volt3", ".lock_out_volt3", 575);
  attachVoltLockoutListener(".lock_byp_volt4", ".lock_out_volt4", 600);
}

// Simplified function for fCalcVoltLockout, fCalcVoltLockout2, fCalcVoltLockout3, fCalcVoltLockout4
function attachVoltLockoutListener(inputSelector, outputSelector, threshold) {
  const host = document.querySelector(".custom-article-content");
  const root = host?.shadowRoot || document;

  const inputs = root.querySelectorAll(inputSelector);
  if (!inputs.length) return;

  inputs.forEach((input) => {
    // Remove old listeners to ensure idempotency
    input.removeEventListener("click", handleClick);
    input.removeEventListener("keyup", handleKeyup);

    input.addEventListener("click", handleClick);
    input.addEventListener("keyup", handleKeyup);

    function handleClick() {
      input.value = "";
    }

    function handleKeyup() {
      const table = input.closest("table");
      if (!table) return;

      const lockout = table.querySelector(outputSelector);
      if (!lockout) return;

      const val = input.value.trim();

      if (isNaN(val)) {
        alert("Please enter a valid number.");
        input.value = "";
        lockout.textContent = "";
        return;
      }

      if (val === "") {
        input.closest("td")?.nextElementSibling?.remove();
        lockout.textContent = "";
        return;
      }

      const bypval = parseFloat(val);
      let outval;
      if (bypval >= threshold) {
        outval = bypval - 0.05 * bypval;
      } else {
        outval = bypval + 0.05 * bypval;
      }

      lockout.textContent = `${outval.toFixed(2)} VAC`;
    }
  });
}

function z25_fImgOverLay() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return;

  const root = host.shadowRoot;

  const cImgLay = root.querySelectorAll("[class|=lay]");

  // Style .ref-modal only if it has a sibling .ref-target containing an overlay
  root.querySelectorAll(".ref-modal").forEach((modal) => {
    const hasOverlay = modal.closest(".ref-target")?.querySelector("[class|=lay]");
    if (hasOverlay) {
      modal.style.background = "none";
      modal.style.paddingRight = "0px";
    }
  });

  // If #lay-board exists, clone once
  const layBoard = root.querySelector("#lay-board");
  if (layBoard && !root.querySelector(".imgLayBrd")) {
    const imgDiv = layBoard.cloneNode(true);
    imgDiv.classList.add("imgLayBrd");
    imgDiv.removeAttribute("id");
    const container = cImgLay[0]?.closest("div");
    if (container) {
      container.prepend(imgDiv);
    }
  }

  // Attach load handler to each overlay image
  cImgLay.forEach((img) => {
    img.addEventListener("load", () => {
      const layClass = img.getAttribute("class") || "";

      // Parse xpos and ypos from class name (format: lay-x_y)
      const dashIndex = layClass.indexOf("-");
      const underscoreIndex = layClass.indexOf("_");
      if (dashIndex === -1 || underscoreIndex === -1) return;

      const xpos = parseInt(layClass.substring(dashIndex + 1, underscoreIndex), 10);
      const ypos = parseInt(layClass.substring(underscoreIndex + 1), 10);

      const layWidth = img.offsetWidth;
      const prevImg = img.previousElementSibling;
      if (!prevImg) return;

      const wImgBrd = prevImg.offsetWidth;
      const hImgBrd = prevImg.offsetHeight;
      if (!wImgBrd || !hImgBrd) return;

      const widthRatio = layWidth / wImgBrd;

      // Apply styles
      img.style.position = "absolute";
      img.style.top = `${(100 * xpos) / hImgBrd}%`;
      img.style.left = `${(100 * ypos) / wImgBrd}%`;
      img.style.width = `${100 * widthRatio}%`;

      const container = img.closest("div");
      if (container) {
        container.style.position = "relative";
        container.style.maxWidth = "600px";
      }

      const refTarget = img.closest(".ref-target");
      if (refTarget) {
        refTarget.style.margin = "0";
        refTarget.style.position = "relative";
        refTarget.style.maxWidth = `${wImgBrd}px`;
      }

      const modalMessage = img.closest("#modal-message");
      if (modalMessage) {
        modalMessage.style.width = "auto";
        modalMessage.style.paddingTop = "0px";
        modalMessage.style.paddingBottom = "0px";
      }
    });
  });
}
// #endregion z25 =========================================================================================================

// #region z27 =========================================================================================================
function z27_getRoot() {
  const host = document.querySelector(".custom-article-content");
  if (!host || !host.shadowRoot) return null;
  return host.shadowRoot;
}

function z27_clearSelect() {
  const root = z27_getRoot();
  if (!root) return;

  root.querySelectorAll("select").forEach((sel) => {
    sel.selectedIndex = 0;
  });

  const label = root.getElementById("batteryStringsLabel") || root.getElementById("batteryStringsLabel2");

  if (label) {
    label.hidden = true;
    label.innerText = "";
  }
}

function z27_libClearTab(divId) {
  if (!divId) return;

  const root = z27_getRoot();
  if (!root) return;

  const table = root.querySelector(`${divId} table`);
  if (!table) return;

  table.querySelectorAll("tr").forEach((tr) => {
    tr.querySelectorAll("td:not(:first-child)").forEach((td) => {
      td.textContent = "";
    });
  });
}

function z27_ResetButton(divId) {
  z27_clearSelect();
  z27_libClearTab(divId);
}

function z27_uniqueArray(text, arr) {
  if (!arr.includes(text)) arr.push(text);
}

function z27_loadOptions(arr, sel) {
  if (!sel) return;

  sel.querySelectorAll("option:not(:first-child)").forEach((opt) => opt.remove());

  arr.forEach((val) => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    sel.appendChild(opt);
  });
}

function z27_createLibSetTable(setting, divId) {
  const root = z27_getRoot();
  if (!root) return;

  const table = root.querySelector(`${divId} table`);
  if (!table) return;

  if (!setting) {
    z27_libClearTab(divId);
    return;
  }

  const cells = table.querySelectorAll("td");

  setting.pnu1510.forEach((v, i) => {
    const cell = cells[1 + i * 4];
    if (cell) cell.textContent = v;
  });

  setting.pnu1511.forEach((v, i) => {
    const cell = cells[2 + i * 4];
    if (cell) cell.textContent = v;
  });

  setting.pnu1513.forEach((v, i) => {
    const cell = cells[3 + i * 4];
    if (cell) cell.textContent = v;
  });
}

function z27_updateSelection(configName, coreName, stringId, labelId, mode = 1) {
  const root = z27_getRoot();
  if (!root) return;

  const config = root.querySelector(`select[name=${configName}]`);
  const core = root.querySelector(`select[name=${coreName}]`);
  const stringSel = root.getElementById(stringId);
  const label = root.getElementById(labelId);

  if (!config || !core || !stringSel || !label) return;

  const batteryConfig = config.value;
  const selectedCores = parseInt(core.value, 10);

  // ----- LABEL -----
  if (batteryConfig === "Centralized") {
    label.hidden = false;
    label.innerText = "Select the number of battery strings per system:";
  } else if (batteryConfig === "Distributed") {
    label.hidden = false;
    label.innerText = "Select the number of battery strings per core:";
  } else {
    label.hidden = true;
    abel.innerText = "";
  }

  core.disabled = !batteryConfig;

  stringSel.innerHTML = '<option value=""> -- </option>';

  if (!batteryConfig || isNaN(selectedCores)) return;

  // SAM / HPL LOGIC
  if (mode === 1) {
    let start = 2;

    if (selectedCores === 2) start = 4;
    if (selectedCores === 3) start = 6;
    if (selectedCores === 4) start = 8;

    for (let i = start; i <= 12; i++) {
      const opt = document.createElement("option");
      opt.value = i;
      opt.textContent = i;
      stringSel.appendChild(opt);
    }
  }

  // VEC LOGIC
  if (mode === 2) {
    if (batteryConfig === "Centralized") {
      if (selectedCores === 2) {
        for (let i = 3; i <= 12; i++) addOption(i);
      } else if (selectedCores === 3) {
        for (let i = 5; i <= 12; i++) addOption(i);
      } else if (selectedCores === 4) {
        for (let i = 6; i <= 12; i++) addOption(i);
      }
    }

    if (batteryConfig === "Distributed") {
      if (selectedCores === 2) {
        for (let i = 2; i <= 6; i++) addOption(i);
      } else if (selectedCores === 3) {
        for (let i = 2; i <= 4; i++) addOption(i);
      } else if (selectedCores === 4) {
        for (let i = 2; i <= 3; i++) addOption(i);
      }
    }

    stringSel.disabled = false;
  }

  function addOption(val) {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    stringSel.appendChild(opt);
  }
}

function z27_fLoadHplLibCalc() {
  z27_clearSelect();

  const root = z27_getRoot();
  if (!root) return;

  // Attach event listener to #batteryConfig to run updateSelection on change
  const batteryConfigSelect = root.querySelector("#batteryConfig");
  const coreSelect = root.querySelector("#coreSelect");
  if (batteryConfigSelect && coreSelect) {
    batteryConfigSelect.addEventListener("change", () => {
      z27_updateSelection("config", "corenum", "batteryStrings", "batteryStringsLabel");
    });

    coreSelect.addEventListener("change", () => {
      z27_updateSelection("config", "corenum", "batteryStrings", "batteryStringsLabel");
    });
  }

  const selects = root.querySelectorAll("select");
  selects.forEach((sel) => {
    sel.addEventListener("change", updateCalc);
  });

  function updateCalc() {
    const core = root.querySelector('select[name="corenum"]').value;
    const config = root.querySelector('select[name="config"]').value;
    const celtemp = root.querySelector('select[name="celtemp"]').value;
    const string = root.querySelector('select[name="stringnum"]').value;

    if (core && config && celtemp && string) {
      const setting = z27HplBattSettings.find((s) => s.corenum == core && s.config == config && s.celtemp == celtemp && s.stringnum == string);

      z27_createLibSetTable(setting, "#lib_setting");

      /* PNU1530 TAB */

      const table = root.querySelector("#lib_pnu1530 table");

      if (table) {
        const coreNum = parseInt(core, 10);
        const strNum = parseInt(string, 10);

        let p1530;

        if (config === "Centralized") {
          if (coreNum === 1) {
            const arr = [500, 700, 800, 900, 1000, 1100, 1200, 1200, 1300, 1300, 1300];
            p1530 = arr[strNum - 2];
          } else if (coreNum === 2) {
            const arr = [null, null, 400, 450, 500, 550, 600, 600, 650, 650, 650];
            p1530 = arr[strNum - 2];
          } else if (coreNum === 3) {
            const arr = [null, null, null, null, 333, 366, 400, 400, 433, 433, 433];
            p1530 = arr[strNum - 2];
          } else if (coreNum === 4) {
            const arr = [null, null, null, null, null, null, 300, 300, 325, 325, 325];
            p1530 = arr[strNum - 2];
          }
        } else if (config === "Distributed") {
          const arr = [500, 700, 800, 900, 1000, 1100, 1200, 1200, 1300, 1300, 1300];
          p1530 = arr[strNum - 2];
        }

        const cells = table.querySelectorAll("td");

        if (cells[0]) cells[0].textContent = string;
        if (cells[1]) cells[1].textContent = p1530;
      }
    } else {
      z27_libClearTab("#lib_setting");
    }
  }
}

function z27_fLoadSamLibCalc() {
  z27_clearSelect();

  const root = z27_getRoot();
  if (!root) return;

  // Attach event listener to #batteryConfig to run updateSelection on change
  const batteryConfigSelect = root.querySelector("#batteryConfig");
  const coreSelect = root.querySelector("#coreSelect");
  if (batteryConfigSelect && coreSelect) {
    batteryConfigSelect.addEventListener("change", () => {
      z27_updateSelection("config", "corenum", "batteryStrings", "batteryStringsLabel");
    });

    coreSelect.addEventListener("change", () => {
      z27_updateSelection("config", "corenum", "batteryStrings", "batteryStringsLabel");
    });
  }

  const selects = root.querySelectorAll("select");
  selects.forEach((sel) => {
    sel.addEventListener("change", updateCalc);
  });

  function updateCalc() {
    const core = root.querySelector('select[name="corenum"]').value;
    const config = root.querySelector('select[name="config"]').value;
    const cell = root.querySelector('select[name="cellnum"]').value;
    const string = root.querySelector('select[name="stringnum"]').value;

    if (core && config && cell && string) {
      const setting = z27SamBattSettings.find((s) => s.corenum == core && s.config == config && s.cellnum == cell && s.stringnum == string);

      z27_createLibSetTable(setting, "#lib_setting");

      // PNU1530 TAB
      const table = root.querySelector("#lib_pnu1530 table");
      if (table) {
        const coreNum = parseInt(core, 10);
        const strNum = parseInt(string, 10);

        let p1530;

        if (config === "Centralized") {
          if (coreNum === 1) p1530 = [440, 660, 880, 1100, 1320, 1540, 1760, 1980, 2200, 2420, 2640][strNum - 2];
          else if (coreNum === 2) p1530 = [null, null, 440, 550, 660, 770, 880, 990, 1100, 1210, 1320][strNum - 2];
          else if (coreNum === 3) p1530 = [null, null, null, null, 440, 513, 586, 660, 733, 806, 880][strNum - 2];
          else if (coreNum === 4) p1530 = [null, null, null, null, null, null, 440, 495, 550, 605, 660][strNum - 2];
        } else if (config === "Distributed") {
          p1530 = [440, 660, 880, 1100, 1320, 1540, 1760, 1980, 2200, 2420, 2640][strNum - 2];
        }

        const cells = table.querySelectorAll("td");
        if (cells[0]) cells[0].textContent = string;
        if (cells[1]) cells[1].textContent = p1530;
      }
    } else {
      z27_libClearTab("#lib_setting");
    }
  }
}

function z27_fLoadVecLibCalc() {
  z27_clearSelect();

  const root = z27_getRoot();
  if (!root) return;

  const batteryConfigSelect = root.querySelector("#batteryConfig2");
  const coreSelect = root.querySelector("#coreSelect2");
  if (batteryConfigSelect && coreSelect) {
    batteryConfigSelect.addEventListener("change", () => {
      z27_updateSelection("config2", "corenum2", "batteryStrings2", "batteryStringsLabel2", 2);
    });

    coreSelect.addEventListener("change", () => {
      z27_updateSelection("config2", "corenum2", "batteryStrings2", "batteryStringsLabel2", 2);
    });
  }

  const selects = root.querySelectorAll("select");
  selects.forEach((sel) => {
    sel.addEventListener("change", updateCalc);
  });

  function updateCalc() {
    const core = root.querySelector('select[name="corenum2"]').value;
    const config = root.querySelector('select[name="config2"]').value;
    const cell = root.querySelector('select[name="cellnum2"]').value;
    const string = root.querySelector('select[name="stringnum2"]').value;

    if (core && config && cell && string) {
      const setting = z27VecBattSettings.find((s) => s.corenum2 == core && s.config2 == config && s.cellnum2 == cell && s.stringnum2 == string);

      z27_createLibSetTable(setting, "#vec_setting");

      /* PNU15301 TAB */

      const table = root.querySelector("#lib_pnu15301 table");

      if (table) {
        const coreNum = parseInt(core, 10);
        const strNum = parseInt(string, 10);

        let p15301;

        if (config === "Centralized") {
          if (coreNum === 2) {
            const arr = [400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400];
            p15301 = arr[strNum - 2];
          } else if (coreNum === 3) {
            const arr = [null, null, null, null, 400, 467, 533, 600, 667, 733, 800];
            p15301 = arr[strNum - 2];
          } else if (coreNum === 4) {
            const arr = [null, null, null, null, null, null, 400, 450, 500, 550, 600];
            p15301 = arr[strNum - 2];
          }
        } else if (config === "Distributed") {
          const arr = [400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000, 2200, 2400];
          p15301 = arr[strNum - 2];
        }

        const cells = table.querySelectorAll("td");

        if (cells[0]) cells[0].textContent = string;
        if (cells[1]) cells[1].textContent = p15301;
      }
    } else {
      z27_libClearTab("#vec_setting");
    }
  }
}
// #endregion z27 =========================================================================================================
