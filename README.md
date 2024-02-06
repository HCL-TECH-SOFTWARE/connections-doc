<p align="center"><strong><a href="https://opensource.hcltechsw.com/connections-doc/v8/"> HCL Connections 8 for on-premises product documentation</a></strong></p>
</p>
<p align="center"><strong><a href="https://opensource.hcltechsw.com/connections-doc/mt/"> HCL Connections Multi-Tenant product documentation</a></strong></p>
</p>

## Contributing

Bug reports on **product documentation** and pull requests are welcome on GitHub at https://github.com/HCL-TECH-SOFTWARE/connections-doc. This is the Connections 8 on-premises and Connections MT product documentation site, not a product support platform. All bug reports and pull requests must pertain to the product documentation.

Updates should be performed only to the markdown files in the following folders
- v8
- v8-cr1
- v8-cr2
- v8-cr3
- v8-cr4
- v8-cr5

### Updating the documentation and validating changes

- Clone the [Connections documentation repository](https://github.com/HCL-TECH-SOFTWARE/connections-doc) and create a working branch.
- Edit the markdown in **connections-doc/source or scr_mt** as needed.
- Install Python 3
- Install missing packages for MkDocs

```bash
pip3 install -r requirements.txt
```

To build the documentation run

```bash
mkdocs serve
```

### Submitting documentation changes

- Open a [Pull Request](https://github.com/HCL-TECH-SOFTWARE/connections-doc/pulls).
- Respond to review comments as needed.
- You will be notified when your changes have been merged. They will appear on the public site the next time the documentation is built.
