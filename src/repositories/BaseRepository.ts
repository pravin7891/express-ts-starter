import { Model, FindOptions, CreateOptions, DestroyOptions, ModelStatic } from "sequelize";

class BaseRepository<T extends Model> {
  protected model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async findAll(options?: FindOptions<T>) {
    return this.model.findAll(options);
  }
  
  async findAndCountAll(options?: FindOptions<T>) {
    return this.model.findAndCountAll(options);
  }

  async findById(id: number, options?: FindOptions<T>) {
    return this.model.findByPk(id, options);
  }

  async findOne(options?: FindOptions<T>) {
    return this.model.findOne(options);
  }

  async create(data: any, options?: CreateOptions<T>) {
    return this.model.create(data, options);
  }

  async update(id: number, data: Partial<T["_attributes"]>) {
    const instance = await this.model.findByPk(id);
    if (!instance) return null;
    return instance.update(data);
  }

  async delete(id: number, options?: DestroyOptions<T>) {
    return this.model.destroy({ where: { id } } as unknown as DestroyOptions<T>);
  }
}

export default BaseRepository;