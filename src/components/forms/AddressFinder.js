import { useEffect,  useState } from "react";
import { saveUserAddress } from "../../functions/user";
import {useSelector, useDispatch} from 'react-redux';
import { toast } from "react-toastify";

const AddressFinder = () => {
  const { user } = useSelector((state) => ({...state}));
  const [cep, setCep] = useState('');
  const [form, setForm] = useState({
    rua: '',
    bairro: '',
    cidade: '',
    estado: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // alert(JSON.stringify(form));
    saveUserAddress(user.token,form).then(res => {
        if(res.data.ok) {
            toast.success("Endereço salvo!")
        }
    });
}

  useEffect(() => { 
    if (cep.length > 7)
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((response) => setForm({
        cep: cep,
        rua: response.logradouro,
        bairro: response.bairro,
        cidade: response.localidade,
        estado: response.uf
      }))
      .catch((error) => console.log(`Não foi possível obter o endereço do CEP informado! Erro:${error}`));

  }, [cep]);

 
function searchingData(e) {
  setCep(e.target.value);
}

function fillingForm({ target }) {
  const {id, value} = target;
  setForm({...form, [id]: value})
}

  return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
                <div className="search-address">
                <label htmlFor="cep">Digite o seu CEP</label>
                <input
                    type="number"
                    id="cep"
                    className="form-control"
                    placeholder="CEP"
                    value={cep}
                    onChange={searchingData}
                />
            </div>
            <div className="input-form street-address">
            <input type="hidden" className="form-control" id="formCep" value={form.cep} onChange={fillingForm}/>
            <label htmlFor="rua">Rua</label>
            <input type="text" className="form-control" id="rua" value={form.rua} onChange={fillingForm}/>
            </div>
            <div className="input-form  number-address">
            <label htmlFor="numero">Número</label>
            <input type="number" className="form-control" id="numero" value={form.numero} onChange={fillingForm}/>
            </div>
            <div className="input-form  complemento-address">
            <label htmlFor="complemento">Complemento</label>
            <input type="text" className="form-control" id="complemento"  value={form.complemento} onChange={fillingForm} />
            </div>
            <div className="input-form  bairro-address">
            <label htmlFor="bairro">Bairro</label>
            <input type="text" className="form-control" id="bairro" value={form.bairro} onChange={fillingForm}/>
            </div>
            <div className="input-form  cidade-address">
            <label htmlFor="cidade">Cidade</label>
            <input type="text"  className="form-control" id="cidade" value={form.cidade} onChange={fillingForm}/>
            </div>
            <div className="input-form  estado-address">
            <label htmlFor="estado">Estado</label>
            <input type="text" className="form-control" id="estado" value={form.estado} onChange={fillingForm} />
            </div>
        </div>
        <br/>
        <button className="btn btn-sm btn-primary mt-2">Salvar</button>
      </form>

  );
};

export default AddressFinder;