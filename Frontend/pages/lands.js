import { useState, useEffect } from "react";
import { Button, Modal, Table } from "antd";
import Navbar from "../components/navbar/Navbar";
import { Select } from "antd";
import { Footer } from "../components/Footer";
import { UpdateData } from "../utils/updateData";
import Router from "next/router";

const { Column } = Table;

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log("search:", value);
};

const contractaddress = "0x2f9227E2e1465a1bB38cE53c4516eC867Ac1535D";

const Lands = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [filterDataset, setFilterDataset] = useState([]);
  const [loadings, setLoadings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/lands/fetch?status=1", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await response.json();
        setData(result);
        console.log("Fetched Data:", result);

        // Filter data based on conditions
        const filtered = result.filter(
          (el) => el.request === false && el.ProcessStatus === 1
        );
        setFilterDataset(filtered);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 100000);
  };

  async function requestLand(PID) {
    enterLoading(0);
    console.log(PID);
    
    try {
      // Update the land data
      await UpdateData(
        { request: true, ProcessStatus: 2 },
        PID
      );

      // Navigate to the BuyPage after the request is completed
      Router.push('/buy');
    } catch (error) {
      console.error("Error during document request:", error);
    }

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[0] = false;
        return newLoadings;
      });
    }, 3000);
  }

  return (
    <div className="bg-slate-100">
      <Navbar />

      <Modal
        title="Land"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={1000}
        okButtonProps={{
          disabled: true,
          style: { display: "none" },
        }}
        cancelButtonProps={{
          disabled: true,
          style: { display: "none" },
        }}
      >
        <iframe
          width="100%"
          height="640"
          frameBorder="0"
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          allowFullScreen
          scrolling="no"
          src="https://kuula.co/share/5hDfC?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"
        ></iframe>
      </Modal>

      <div className="pt-[130px]">
        <div className="flex flex-col m-auto p-auto w-[90%] shadow-2xl rounded-2xl">
          <div className="flex items-center flex-none px-4 bg-gradient-to-r from-[#240146] via-[#741760]  to-[#f63d8d] rounded-b-none h-11 rounded-xl">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 border-2 border-[#dc2626] bg-[#dc2626] rounded-full"></div>
              <div className="w-3 h-3 border-2 border-[#eab308] bg-[#eab308] rounded-full"></div>
              <div className="w-3 h-3 border-2 border-[#22c55e] bg-[#22c55e] rounded-full"></div>
              <div className="w-96 h-3 -mt-2.5 pl-4">
                <Select
                  showSearch
                  placeholder="Select a City"
                  optionFilterProp="children"
                  defaultValue="Nagpur"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    { value: "Nagpur", label: "Nagpur" },
                    { value: "Mumbai", label: "Mumbai"  }, 
                    { value: "Pune", label: "Pune" },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="p-8">
            <h1 className="flex pb-5 font-bold text-4xl text-gray-800">Selling Land Gallery</h1>
            <Table dataSource={data} rowKey="propertyID">
              <Column title="Image" dataIndex="ImageURL" key="ImageURL" render={url => <img src={url} alt="Land" style={{ width: '100px', height: '75px' }} />} />
              <Column title="Area (sq.m.)" dataIndex="area" key="area" />
              <Column title="Price (Rs.)" dataIndex="price" key="price" />
              <Column title="PID" dataIndex="PID" key="PID" />
              <Column title="Survey No" dataIndex="physicalSurveyNo" key="physicalSurveyNo" />
              <Column title="Owner" dataIndex="ownerAddress" key="ownerAddress" />
              <Column
                title="Actions"
                key="actions"
                render={(text, record) => 
                  <div>
                    <Button onClick={() => setOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      3D Land View
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => requestLand(record.PID)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Request Document
                    </Button>
                  </div>
                }
              />
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Lands;
